import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";
import { Consulta, TablaEquiposDuplicadosComponent } from '../tabla-equipos-duplicados/tabla-equipos-duplicados.component'; 
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-equipos-duplicados',
  templateUrl: './equipos-duplicados.component.html',
  styleUrls: [ './equipos-duplicados.component.css' ],
  standalone: true,
  imports: [
    ModalExitosoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    TablaEquiposDuplicadosComponent,
    ButtonModule,
    NgForOf,
    NavbarComponent
  ]
})
export class EquiposDuplicadosComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Equipos duplicados', link: '/equipos-duplicados' },
  ];
  displayedColumns: string[] = [ 'nombreEquipo', 'codigoInventario', 'datosModificados' ];
  mostrarModalExito: boolean = false; // Controla la visibilidad del modal exitoso
  tituloModalExito: string = 'Equipos reemplazados'; // Título para el modal exitoso
  mensajeModalExito: string = 'Los equipos fueron reemplazados con éxito'; // Mensaje para el modal exitoso
  // Define tus datos de consulta aquí
  datos: Consulta[] = [
    {
      nombreEquipo: 'Laptop Pro',
      codigoInventario: 'DCP001',
      datosModificados: [ 'Agencia A', 'Fecha de modificación: 2023-01-15', 'Usuario responsable: Juan' ]
    },
    {
      nombreEquipo: 'Desktop Power',
      codigoInventario: 'DCP002',
      datosModificados: [ 'Agencia B', 'Fecha de modificación: 2023-02-20', 'Usuario responsable: Maria' ]
    },
    {
      nombreEquipo: 'Monitor Ultra',
      codigoInventario: 'DCP003',
      datosModificados: [ 'Agencia C', 'Fecha de modificación: 2023-03-25', 'Usuario responsable: Carlos' ]
    },
    {
      nombreEquipo: 'Server Max',
      codigoInventario: 'DCP004',
      datosModificados: [ 'Agencia D', 'Fecha de modificación: 2023-04-30', 'Usuario responsable: Sofia' ]
    },
    {
      nombreEquipo: 'Printer Plus',
      codigoInventario: 'DCP005',
      datosModificados: [ 'Agencia E', 'Fecha de modificación: 2023-05-05', 'Usuario responsable: Pedro' ]
    },
    // Agrega más datos según sea necesario
  ];

  constructor(private router: Router) {
  }

  abrirModalExito(): void {
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
    this.router.navigate([ '/home' ]);
  }
}
