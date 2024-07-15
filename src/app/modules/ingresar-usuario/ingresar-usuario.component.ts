import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { RutPipe } from '@app/core/pipes/rut.pipe';
import { Company, CompanyService } from '@app/services/company.service';
import { cleanEmptyFields } from '@app/utils/utils';
import { UserService } from '@app/common/user/services/user.service';
import { ModalAdvertenciaComponent } from '../Custom/modal-advertencia/modal-advertencia.component';
import {
  catchError,
  delay,
  of,
  retryWhen,
  scan,
  switchMap,
  throwError,
  timeout,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RutFormatterDirective } from '@app/core/directives/rut-formatter.directive';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css'],
  standalone: true,
  imports: [
    ModalExitosoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NgForOf,
    NavbarComponent,
    FormsModule,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    RutPipe,
    RutFormatterDirective,
    ModalAdvertenciaComponent,
  ],
})
export class IngresarUsuarioComponent implements OnInit {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingresar-usuario', link: '/ingresar-usuario' },
  ];

  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = 'Hubo un error en su solicitud';
  tituloModalAdvertencia: string = 'Error';
  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  loading = false;
  // selectorCompany: Observable<Partial<Company>[]> = of([]);
  empresas: Company[] = [];
  maxRetries: number = 5;
  usuarioForm: FormGroup;
  private readonly _matSnackBar: MatSnackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router
  ) {
    this.usuarioForm = this._loadForm();
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.empresas = companies;
      },
      error: (error) => {
        console.error('Error al cargar las empresas:', error);
      },
    });
  }

  private _loadForm() {
    return this.fb.group({
      rut: [undefined, [Validators.required]],
      activo: [true],
      email: [undefined, [Validators.required, Validators.email]],
      nombres: [undefined, [Validators.required]],
      apellidos: [undefined, [Validators.required]],
      rolId: [undefined, [Validators.required]],
      empresa: [undefined, [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.usuarioForm.valid) {

      const rutControl = this.usuarioForm.get('rut');
      if (rutControl) {
        const rutPipe = new RutPipe();
        const formattedRut = rutPipe.transform(rutControl.value);
        rutControl.setValue(formattedRut);
      }

      const formData = cleanEmptyFields(this.usuarioForm.getRawValue());
      formData.rolId = Number(formData.rolId);
      formData.empresaId = formData.empresa;
      delete formData.empresa;
      formData.usuarioCreacionId = this.userService.getUserId()

      this.userService.createUser(formData)
        .pipe(
          catchError((error) => {
            console.error('Error al crear el usuario', error);
            const errorMessage =
              error.error?.message || 'Se produjo un error inesperado.';
            this.abrirModalAdvertencia(errorMessage);
            this.loading = false;
            return throwError(error);
          })
        )
        .subscribe({
          next: (response) => {
            if (response.temporaryPassword) {
              this.usuarioForm.reset();
              this.abrirModalExito(response.temporaryPassword);
            }
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
    } else {
      this.abrirModalAdvertencia(
        'Por favor, verifica que todos los campos estén correctos.'
      );
      this.loading = false;
    }
  }

  abrirModalExito(temporaryPassword: string): void {
    this.tituloModalExito = 'Ingreso Usuario';
    this.mensajeModalExito = `Usuario ha sido ingresado con éxito. Por favor copiar los valores:<br/><br/>
    <strong>Contraseña temporal:</strong>${temporaryPassword}`;
    navigator.clipboard
      .writeText(temporaryPassword)
      .then(() => {
        console.log('Contraseña temporal copiada al portapapeles');
        this._matSnackBar.open(
          'Contraseña temporal copiada al portapapeles',
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }
  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
  abrirModalAdvertencia(mensaje: string): void {
    this.tituloModalAdvertencia = 'Error al ingresar usuario';
    this.mensajeModalAdvertencia = mensaje;
    this.mostrarModalAdvertencia = true;
  }
}
