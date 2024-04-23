import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-consulta-masiva',
  templateUrl: './modal-consulta-masiva.component.html',
  styleUrls: [ './modal-consulta-masiva.component.css' ],
  standalone: true,
})
export class ModalConsultaMasivaComponent {

  @Output() cerrar = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

  irAConsultaMasiva() {
    this.router.navigate([ '/consulta-masiva' ]);
  }
}
