import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { confirmSignUp } from 'aws-amplify/auth';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: [ './verificar-usuario.component.css' ],
  imports: [
    ModalExitosoComponent,
    NgIf,
    ButtonModule,
    RouterLink,
    FormsModule,
    CardModule,
    InputTextModule
  ],
  standalone: true
})
export class VerificarUsuarioComponent {
  username: string = '';
  confirmationCode: string = '';
  error: string = '';
  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';

  constructor(private router: Router) { }

  async verificarCodigo() {
    try {
      await confirmSignUp({
        username: this.username,
        confirmationCode: this.confirmationCode
      });
      this.abrirModalExito();
    } catch ( error: unknown ) {  
      console.error('Error confirmando el registro:', error);
      if ( error instanceof Error ) {  
        this.error = error.message;
      } else {
        this.error = "Se ha producido un error desconocido.";
      }
    }
  }


  abrirModalExito(): void {
    this.tituloModalExito = 'Verificación Exitosa';
    this.mensajeModalExito = 'Su cuenta ha sido verificada con éxito.';
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
    this.router.navigate(['/sign-in']);
   
  }
}
