import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-advertencia',
  templateUrl: './modal-advertencia.component.html',
  styleUrl: './modal-advertencia.component.css',
  standalone: true,
  imports: [NgIf]  
})
export class ModalAdvertenciaComponent {
  @Input() tituloModalAdvertencia: string = 'Error'; 
  @Input() mensajeModalAdvertencia: string = 'Hubo un error en su solicitud'; 
  @Input() mostrarModal: boolean = false;
  @Output() cerrar = new EventEmitter<void>();


  cerrarModal(): void {
    this.cerrar.emit(); // Emite el evento para ser escuchado por el componente padre
  }

}
