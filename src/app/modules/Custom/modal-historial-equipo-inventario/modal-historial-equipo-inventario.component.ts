import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Element, ELEMENT_DATA1, TablasHistorialEquipoComponent, } from '../../tablas-historial-equipo/tablas-historial-equipo.component';

@Component({
  selector: 'app-modal-historial-equipo-inventario',
  templateUrl: './modal-historial-equipo-inventario.component.html',
  styleUrl: './modal-historial-equipo-inventario.component.css',
  standalone: true,
  imports: [
    TablasHistorialEquipoComponent
  ]
})
export class ModalHistorialEquipoInventarioComponent {
  @Output() cerrar = new EventEmitter<void>();

  inventarioDataSource = new MatTableDataSource<Element>(ELEMENT_DATA1);
  activaDataSource: MatTableDataSource<Element>;

  constructor() {
    this.activaDataSource = this.inventarioDataSource;
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
