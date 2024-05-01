import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-resumen-ingreso-individual',
  templateUrl: './modal-resumen-ingreso-individual.component.html',
  styleUrls: ['./modal-resumen-ingreso-individual.component.css'],
  standalone: true
})
export class ModalResumenIngresoIndividualComponent implements OnInit {
  @Input() datosModal: any; 
  formattedDate: string = '';  
  formattedTime: string = ''; 


  @Output() cerrar = new EventEmitter<void>();  
  @Output() exito = new EventEmitter<void>();   
  ngOnInit() {
  
    if (this.datosModal && this.datosModal.fechaIngreso) {
      const date = new Date(this.datosModal.fechaIngreso);
      this.formattedDate = date.toLocaleDateString('es-CL', { year: 'numeric', month: '2-digit', day: '2-digit' });
      this.formattedTime = date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    }
    console.log('Datos recibidos en el modal:', this.datosModal);
    console.log('Formatted Date:', this.formattedDate);
    console.log('Formatted Time:', this.formattedTime);
  }

  cerrarModal(): void {
    this.cerrar.emit();  
  }

  confirmarAccion(): void {
    this.exito.emit();  
  }
}
