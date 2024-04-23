import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css',
  standalone: true,
  imports: [
    InputTextModule
  ]
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
