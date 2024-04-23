import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-modal-gestion-usuario',
  templateUrl: './modal-gestion-usuario.component.html',
  styleUrl: './modal-gestion-usuario.component.css',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class ModalGestionUsuarioComponent {
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
