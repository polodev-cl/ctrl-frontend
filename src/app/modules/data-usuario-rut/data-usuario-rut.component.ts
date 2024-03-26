import { Component } from '@angular/core';

@Component({
  selector: 'app-data-usuario-rut',
  templateUrl: './data-usuario-rut.component.html',
  styleUrl: './data-usuario-rut.component.css',
})
export class DataUsuarioRutComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Usuario-rut', link: '/data-rut-usuario' },
  ];

  mostrarModalHistorialEquipo: boolean = false;

  //consulta masiva
  abrirModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = true;
  }

  cerrarModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = false;
  }

}
