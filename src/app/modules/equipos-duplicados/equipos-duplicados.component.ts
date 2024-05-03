import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';
import {
  Consulta,
  TablaEquiposDuplicadosComponent,
} from '../tabla-equipos-duplicados/tabla-equipos-duplicados.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-equipos-duplicados',
  templateUrl: './equipos-duplicados.component.html',
  styleUrls: ['./equipos-duplicados.component.css'],
  standalone: true,
  imports: [
    ModalExitosoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    TablaEquiposDuplicadosComponent,
    ButtonModule,
    NgForOf,
    NavbarComponent,
  ],
})
export class EquiposDuplicadosComponent implements OnInit {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Equipos duplicados', link: '/equipos-duplicados' },
  ];
  displayedColumns: string[] = ['descripcion'];
  mostrarModalExito: boolean = false;
  errores: string[] = [];

  datos: Consulta[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const erroresJson = localStorage.getItem('erroresDuplicados');
    if (erroresJson) {
      this.datos = (JSON.parse(erroresJson) as string[]).map((message) => ({
        descripcion: message,
      }));
    }
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
    this.router.navigate(['/home']);
  }
}
