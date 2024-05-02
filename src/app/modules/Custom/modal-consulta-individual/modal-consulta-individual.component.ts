import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { InputTextModule } from "primeng/inputtext";
import { EquipmentService } from '../../../common/equipment/services/equipment.service';

@Component({
  selector: 'app-modal-consulta-individual',
  templateUrl: './modal-consulta-individual.component.html',
  styleUrls: [ './modal-consulta-individual.component.css' ],
  standalone: true,
  imports: [
    NgIf,
    InputTextModule,
    FormsModule
  ]
})
export class ModalConsultaIndividualComponent {
  @Input() tipoConsulta: 'usuario' | 'agencia' | 'inventario' | null = null;
  @Output() cerrar = new EventEmitter<void>();
  rut: string = '';
  noResultsFound: boolean = false;
  inventario: number | null = null;
  dpc: number | null = null;

  constructor(private router: Router, private equipmentService: EquipmentService) {
  }

  cerrarModal(): void {
    this.cerrar.emit();
    this.noResultsFound = false;
  }


  buscar(): void {
    if ( this.tipoConsulta === 'usuario' && this.rut ) {
      this.equipmentService.getEquipmentByRut(this.rut).subscribe({
        next: (data) => {
          if ( data.length > 0 ) {
            this.router.navigate([ '/data-usuario-rut', { rut: this.rut } ]);
          } else {
            this.noResultsFound = true;
          }
        },
        error: () => {
          this.noResultsFound = true;
        }
      });
    } else if ( this.tipoConsulta === 'agencia' && this.dpc !== null ) {
      this.equipmentService.getEquipmentByDPC(this.dpc).subscribe({
        next: (data) => {
          if ( data.length > 0 ) {
            this.router.navigate([ '/data-agencia-dpc', { agenciaDpc: this.dpc } ]);
          } else {
            this.noResultsFound = true;
          }
        },
        error: () => {
          this.noResultsFound = true;
        }
      });
    } else if ( this.tipoConsulta === 'inventario' && this.inventario !== null ) {
      this.equipmentService.getEquipmentByInventory(this.inventario).subscribe({
        next: (data) => {
          if ( data.length > 0 ) {
            this.router.navigate([ '/data-numero-inventario', { inventario: this.inventario } ]);
          } else {
            this.noResultsFound = true;
          }
        },
        error: () => {
          this.noResultsFound = true;
        }
      });
    }
  }
}
