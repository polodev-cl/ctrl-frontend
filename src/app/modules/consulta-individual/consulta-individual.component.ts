import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ModalConsultaIndividualComponent } from "../Custom/modal-consulta-individual/modal-consulta-individual.component";

@Component({
  selector: 'app-consulta-individual',
  templateUrl: './consulta-individual.component.html',
  styleUrls: [ './consulta-individual.component.css' ],
  standalone: true,
  imports: [
    ModalConsultaIndividualComponent,
    DividerModule,
    NgForOf,
    RouterLink,
    NgIf,
    ButtonModule
  ]
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
