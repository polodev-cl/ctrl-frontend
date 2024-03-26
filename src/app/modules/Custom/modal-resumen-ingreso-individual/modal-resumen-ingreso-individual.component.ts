import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-resumen-ingreso-individual',
  templateUrl: './modal-resumen-ingreso-individual.component.html',
  styleUrl: './modal-resumen-ingreso-individual.component.css'
})
export class ModalResumenIngresoIndividualComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() exito = new EventEmitter<void>(); 
  cerrarModal(): void {
    this.cerrar.emit();
  }
  confirmarAccion(): void {
    this.exito.emit();
  }
  
}
