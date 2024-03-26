import { Component } from '@angular/core';

@Component({
  selector: 'app-ingreso-individual',
  templateUrl: './ingreso-individual.component.html',
  styleUrl: './ingreso-individual.component.css'
})
export class IngresoIndividualComponent {
  breadcrumbs = [

    { text: 'Home', link: '/home' },
    { text: 'Ingreso individual', link: '/ingreso-individual' }
  
  ];

  tituloModalExito: string = ''; 
  mensajeModalExito: string = ''; 

  mostrarModalExito: boolean = false; 
  mostrarModalResumenIngresoIndividual: boolean = false;
  abrirModalExito(): void {
    this.mostrarModalResumenIngresoIndividual = false; // Cierra el modal actual
    this.tituloModalExito = 'Ingreso Individual';
    this.mensajeModalExito = 'El ingreso individual se ha realizado con éxito.';
    // Configura y abre el modal de éxito
    this.mostrarModalExito = true;
    // Aquí puedes configurar el mensaje y título del modal de éxito si es necesario
  }
 
  //consulta masiva
  abrirModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = true;
  }

  cerrarModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = false;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }
}
