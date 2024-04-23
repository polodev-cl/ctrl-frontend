import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-modal-duplicado',
  templateUrl: './modal-duplicado.component.html',
  styleUrl: './modal-duplicado.component.css',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class ModalDuplicadoComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() reemplazar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit(); // Emite el evento para ser escuchado por el componente padre
  }

  reemplazarYCerrar(): void {
    this.reemplazar.emit(); // Emitir evento para reemplazar y luego cerrar el modal
  }
}
