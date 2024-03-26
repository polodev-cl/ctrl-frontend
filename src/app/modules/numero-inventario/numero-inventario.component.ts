import { Component } from '@angular/core';

@Component({
  selector: 'app-numero-inventario',
  templateUrl: './numero-inventario.component.html',
  styleUrl: './numero-inventario.component.css'
})
export class NumeroInventarioComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Número de inventario', link: '/data-numero-inventario' },
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
