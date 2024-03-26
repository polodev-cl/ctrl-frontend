import { Component } from '@angular/core';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css']
})
export class IngresarUsuarioComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingresar-usuario', link: '/ingresar-usuario' }
  ];

  mostrarModalExito: boolean = false; // Controla la visibilidad del modal exitoso
  tituloModalExito: string = ''; // Título para el modal exitoso
  mensajeModalExito: string = ''; // Mensaje para el modal exitoso

  abrirModalExito(): void {
    this.tituloModalExito = 'Ingreso Usuario'; // Define el título
    this.mensajeModalExito = 'Usuario JPerez ha sido ingresado con éxito'; // Define el mensaje
    this.mostrarModalExito = true; // Muestra el modal
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false; // Oculta el modal
  }
}
