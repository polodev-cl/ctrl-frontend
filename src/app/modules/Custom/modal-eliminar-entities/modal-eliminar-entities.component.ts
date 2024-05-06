import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-eliminar-entities',
  templateUrl: './modal-eliminar-entities.component.html',
  styleUrl: './modal-eliminar-entities.component.css',
  standalone: true,
})
export class ModalEliminarEntitiesComponent {
  @Input() titulo: string = '';
  @Input() mensaje: string = '';
  @Input() mensajeModal: string = '';
  @Output() cerrar = new EventEmitter<void>();
  @Output() exito = new EventEmitter<void>();

  abrirModalExitoso(): void {
    this.exito.emit();
  }

  cerrarModal(): void {
    this.cerrar.emit(); 
  }

}
