import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-duplicado',
  templateUrl: './modal-duplicado.component.html',
  styleUrl: './modal-duplicado.component.css'
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
