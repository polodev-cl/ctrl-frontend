import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    ModalAdvertenciaComponent,
  ],
})
export class IngresarUsuarioComponent implements OnInit{
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

  usuarioForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private userService: UserService,
  ) {
    this.usuarioForm = this._loadForm();
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        console.log("empresas:", companies)
        this.empresas = companies;
     
      },
      error: (error) => {
        console.error('Error al cargar las empresas:', error);
      }
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
      const formData = cleanEmptyFields(this.usuarioForm.getRawValue());
      formData.rolId = Number(formData.rolId);
      formData.empresaId = formData.empresa;
  
      this.userService.createUser(formData).subscribe({
        next: (response) => {
          console.log('Usuario creado con éxito', response);
          if (response.temporaryPassword) {
            this.abrirModalExito(response.temporaryPassword);
          }
          this.loading = false; 
        },
        error: (error) => {
          console.error('Error al crear el usuario', error);
          const errorMessage = error.error.message || 'Se produjo un error inesperado.';
          console.log("error: ", errorMessage);
          this.abrirModalAdvertencia(errorMessage);
          this.loading = false; 
        }
      });
    } else {
      this.abrirModalAdvertencia('Por favor, verifica que todos los campos estén correctos.');
      this.loading = false; 
    }
  }
  
  abrirModalExito(temporaryPassword: string): void {
    this.tituloModalExito = 'Ingreso Usuario';
    this.mensajeModalExito = `Usuario ha sido ingresado con éxito. Contraseña temporal: ${temporaryPassword}`
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
