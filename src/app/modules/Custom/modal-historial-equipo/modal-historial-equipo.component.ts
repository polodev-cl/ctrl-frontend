import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Element, ELEMENT_DATA3, TablasHistorialEquipoComponent, } from '../../tablas-historial-equipo/tablas-historial-equipo.component';

@Component({
  selector: 'app-modal-historial-equipo',
  templateUrl: './modal-historial-equipo.component.html',
  styleUrls: [ './modal-historial-equipo.component.css' ],
  standalone: true,
  imports: [
    TablasHistorialEquipoComponent
  ]
})
export class ModalHistorialEquipoComponent {
  @Output() cerrar = new EventEmitter<void>();

  rutDataSource = new MatTableDataSource<Element>(ELEMENT_DATA3);

  // Esta variable determina qué tabla está actualmente visible.
  activaDataSource: MatTableDataSource<Element>;

  constructor() {
    // Inicializa con la tabla de inventario como predeterminada
    this.activaDataSource = this.rutDataSource;
  }

  // mostrarInventario() {
  //   this.activaDataSource = this.inventarioDataSource;
  // }

  // mostrarDCP() {
  //   this.activaDataSource = this.dcpDataSource;
  // }

  // mostrarRUT() {
  //   this.activaDataSource = this.rutDataSource;
  // }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
