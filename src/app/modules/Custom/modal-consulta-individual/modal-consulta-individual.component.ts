import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-consulta-individual',
  templateUrl: './modal-consulta-individual.component.html',
  styleUrls: ['./modal-consulta-individual.component.css']
})
export class ModalConsultaIndividualComponent {
  @Input() tipoConsulta: 'usuario' | 'agencia' | 'inventario' | null = null;
  @Output() cerrar = new EventEmitter<void>();
  rut: string = ''; 
  constructor(private router: Router) {} 

  cerrarModal(): void {
    this.cerrar.emit();
  }
  buscar(): void {
    if (this.tipoConsulta === 'usuario') {
      // Navega a la ruta para consulta de usuario/rut
         this.router.navigate(['/data-usuario-rut', { rut: this.rut }]);
    } else if (this.tipoConsulta === 'agencia') {
      // Navega a la ruta para consulta de agencia/DPC
      this.router.navigate(['/data-agencia-dcp']);
    } else if (this.tipoConsulta === 'inventario') {
      // Navega a la ruta para consulta de número de inventario
      this.router.navigate(['/data-numero-inventario']);
    }
  }
}
