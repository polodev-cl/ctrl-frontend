import { Component } from '@angular/core';

@Component({
  selector: 'app-agencia-dcp',
  templateUrl: './agencia-dcp.component.html',
  styleUrl: './agencia-dcp.component.css'
})
export class AgenciaDcpComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Agencia-dcp', link: '/data-agencia-dcp' },
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
