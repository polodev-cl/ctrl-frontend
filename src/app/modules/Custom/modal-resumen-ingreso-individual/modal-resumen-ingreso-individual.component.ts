import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-resumen-ingreso-individual',
  templateUrl: './modal-resumen-ingreso-individual.component.html',
  styleUrls: ['./modal-resumen-ingreso-individual.component.css'],
  standalone: true
})
export class ModalResumenIngresoIndividualComponent {
  @Input() datosModal: any;

  @Output() cerrar = new EventEmitter<void>();
  @Output() exito = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }

  confirmarAccion(): void {
    this.exito.emit();
  }
}
