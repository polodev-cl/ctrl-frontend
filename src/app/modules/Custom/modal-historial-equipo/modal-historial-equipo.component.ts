import { Component, EventEmitter, Output, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Element, TablasHistorialEquipoComponent, } from '../../tablas-historial-equipo/tablas-historial-equipo.component';
import { EquipmentService } from '../../../common/equipment/services/equipment.service';
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
  @Input() equipoId!: number;
  @Output() cerrar = new EventEmitter<void>();

  rutDataSource = new MatTableDataSource<Element>();

  // Esta variable determina qué tabla está actualmente visible.
  activaDataSource: MatTableDataSource<Element>;



  ngOnInit() {
    if (this.equipoId) {
      this.buscarHistorialEquipo(this.equipoId);
    }
  }

  
  constructor(private equipmentService: EquipmentService) {
    // Inicializa con la tabla de inventario como predeterminada
    this.activaDataSource = this.rutDataSource;
  }



  buscarHistorialEquipo(equipmentId: number): void {
    this.equipmentService.getEquipmentHistory(equipmentId).subscribe({
      next: (data) => {
        this.activaDataSource = new MatTableDataSource(data);
      },
      error: (error) => {
        console.error('Error fetching history:', error);
      }
    });
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
