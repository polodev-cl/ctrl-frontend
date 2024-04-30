import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Element, TablasHistorialEquipoComponent } from '../../tablas-historial-equipo/tablas-historial-equipo.component';

@Component({
  selector: 'app-modal-historial-equipo-dcp',
  templateUrl: './modal-historial-equipo-dcp.component.html',
  styleUrls: ['./modal-historial-equipo-dcp.component.css'], 
  imports: [
    TablasHistorialEquipoComponent
  ],
  standalone: true
})
export class ModalHistorialEquipoDcpComponent implements OnChanges {
  @Output() cerrar = new EventEmitter<void>();
  @Input() historialEquipos: Element[] | undefined;

  activaDataSource: MatTableDataSource<Element>;

  constructor() {
    this.activaDataSource = new MatTableDataSource<Element>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historialEquipos'] && changes['historialEquipos'].currentValue) {
      this.activaDataSource.data = changes['historialEquipos'].currentValue;
    }
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
