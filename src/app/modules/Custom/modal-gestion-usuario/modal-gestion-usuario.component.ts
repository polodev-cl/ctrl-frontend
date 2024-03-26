import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-gestion-usuario',
  templateUrl: './modal-gestion-usuario.component.html',
  styleUrl: './modal-gestion-usuario.component.css'
})
export class ModalGestionUsuarioComponent {
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
