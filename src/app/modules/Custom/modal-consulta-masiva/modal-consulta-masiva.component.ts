import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-consulta-masiva',
  templateUrl: './modal-consulta-masiva.component.html',
  styleUrls: ['./modal-consulta-masiva.component.css']
})
export class ModalConsultaMasivaComponent {

  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }
  constructor(private router: Router) {}
  irAConsultaMasiva() {
    this.router.navigate(['/consulta-masiva']);
  }
}
