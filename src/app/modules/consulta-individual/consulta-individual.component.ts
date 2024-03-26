import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-individual',
  templateUrl: './consulta-individual.component.html',
  styleUrls: ['./consulta-individual.component.css']
})
export class ConsultaIndividualComponent {
  breadcrumbs = [
  
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' }
  ];

  mostrarModalConsultaIndividual: boolean = false;
  tipoConsulta: 'usuario' | 'agencia' | 'inventario' | null = null;

  abrirModalConsultaIndividual(tipo: 'usuario' | 'agencia' | 'inventario'): void {
    this.tipoConsulta = tipo;
    console.log(this.tipoConsulta);
    this.mostrarModalConsultaIndividual = true;
  }

  cerrarModalConsultaIndividual(): void {
    this.mostrarModalConsultaIndividual = false;
  }
}
