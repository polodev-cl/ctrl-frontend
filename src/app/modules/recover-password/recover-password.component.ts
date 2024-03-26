import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  password: string = '';
  showPassword: boolean = false;
  tituloModal: string = '';
  mensajeModal: string = '';
  mostrarModal: boolean = false;
  constructor(private router: Router) {} 
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  abrirModalExitoso(): void {
    this.tituloModal = 'Contraseña actualizada';
    this.mensajeModal = 'Su contraseña se ha actualizado con éxito,<br/>presione volver para dirigirse al login.';
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.router.navigate(['/login']);
  }
}
