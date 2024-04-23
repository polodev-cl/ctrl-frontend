import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { signUp } from 'aws-amplify/auth';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: [ './ingresar-usuario.component.css' ],
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
    NgForOf
  ]
})
export class IngresarUsuarioComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingresar-usuario', link: '/ingresar-usuario' }
  ];

  nombreUsuario: string = '';
  email: string = '';
  password: string = 'test1234';
  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';

  async registrarUsuario() {
    try {
      await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: {
            email: this.email,
            // Otros atributos aquí...
          },
          autoSignIn: { enabled: true }
        }
      });
      // Llamar al modal de éxito inmediatamente después de la promesa signUp
      this.abrirModalExito();
    } catch ( error ) {
      console.error('Error en el registro de usuario:', error);
    }
  }

  abrirModalExito(): void {
    this.tituloModalExito = 'Ingreso Usuario';
    this.mensajeModalExito = `Usuario ${ this.nombreUsuario } ha sido ingresado con éxito`;
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }
}
