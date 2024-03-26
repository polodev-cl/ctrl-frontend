import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() exitoEditar = new EventEmitter<void>(); 
  @Input() mensajeModalEditar: string = '';

  cerrarModal(): void {
    this.cerrar.emit(); // Emite el evento para ser escuchado por el componente padre
  }
  editarUsuarioExitoso(): void {
    this.exitoEditar.emit(); // Emite el evento de edición exitosa
  }
}
