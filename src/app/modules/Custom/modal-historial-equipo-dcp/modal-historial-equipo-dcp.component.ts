import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  Element,
  ELEMENT_DATA2,
} from '../../tablas-historial-equipo/tablas-historial-equipo.component'; // Asegúrate de ajustar las rutas de importación según sea necesario.

@Component({
  selector: 'app-modal-historial-equipo-dcp',
  templateUrl: './modal-historial-equipo-dcp.component.html',
  styleUrl: './modal-historial-equipo-dcp.component.css',
})
export class ModalHistorialEquipoDcpComponent {
  @Output() cerrar = new EventEmitter<void>();

  dcpDataSource = new MatTableDataSource<Element>(ELEMENT_DATA2);
  activaDataSource: MatTableDataSource<Element>;

  constructor() {
    this.activaDataSource = this.dcpDataSource;
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
