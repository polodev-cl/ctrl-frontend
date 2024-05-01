import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { signUp } from 'aws-amplify/auth';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
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
import { Observable, of } from 'rxjs';
import { cleanEmptyFields } from '@app/utils/utils';
import { UserService } from '@app/common/user/services/user.service';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css'],
  standalone: true,
  imports: [
    ModalExitosoComponent,
    NgIf,
    DividerModule,
    UserProfileComponent,
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
  ],
})
export class IngresarUsuarioComponent implements OnInit{
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingresar-usuario', link: '/ingresar-usuario' },
  ];


  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';
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
   if(this.usuarioForm.valid){
    const formData = cleanEmptyFields(this.usuarioForm.getRawValue());
    formData.rolId = Number(formData.rolId);
    formData.empresaId = formData.empresa;
    this.userService.createUser(formData).subscribe(
      response => {
        console.log('Equipo creado con éxito', response);
      },
      error =>{
        console.error('Error al crear el equipo', error);
      }
    )
   }
  }

  abrirModalExito(): void {
    this.tituloModalExito = 'Ingreso Usuario';
    this.mensajeModalExito = `Usuario ha sido ingresado con éxito`;
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }
}
