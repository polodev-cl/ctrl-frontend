import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-resumen-ingreso-individual',
  templateUrl: './modal-resumen-ingreso-individual.component.html',
  styleUrls: ['./modal-resumen-ingreso-individual.component.css'],
  standalone: true
})
export class ModalResumenIngresoIndividualComponent implements OnInit {
  @Input() datosModal: any; 
  formattedDateIngreso: string = '';  
  formattedDateCompra: string = ''; 


  @Output() cerrar = new EventEmitter<void>();  
  @Output() exito = new EventEmitter<void>();   
  ngOnInit() {
  
    if (this.datosModal && this.datosModal.fechaIngreso) {
      const date = new Date(this.datosModal.fechaIngreso);
      this.formattedDateIngreso = date.toLocaleDateString('es-CL', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    if (this.datosModal && this.datosModal.fechaCompra) {
      const date = new Date(this.datosModal.fechaCompra);
      this.formattedDateCompra = date.toLocaleDateString('es-CL', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    console.log('Datos recibidos en el modal:', this.datosModal);

  }

  constructor(private router: Router) { }


  cerrarModal(): void {
    this.cerrar.emit();  
  }

  confirmarAccion(): void {
    this.exito.emit();
    this.router.navigate(['/home']);  
  }
}
