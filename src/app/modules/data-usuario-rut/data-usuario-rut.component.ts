import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';
@Component({
  selector: 'app-data-usuario-rut',
  templateUrl: './data-usuario-rut.component.html',
  styleUrls: ['./data-usuario-rut.component.css'],
})
export class DataUsuarioRutComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Usuario-rut', link: '/data-rut-usuario' },
  ];
  equipment: any = null;
  rut: string = '';
  mostrarModalHistorialEquipo: boolean = false;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rut = params['rut']; // Captura el rut desde los parámetros de ruta
      if (this.rut) {
        this.buscarPorRut(this.rut);
      }
    });
  }

  buscarPorRut(rut: string): void {
    this.equipmentService.getEquipmentByRut(rut).subscribe({
      next: (data) => {
        this.equipment = data;
        console.log('Received equipment:', data);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.equipment = null;
      }
    });
  }
  //consulta masiva
  abrirModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = true;
  }

  cerrarModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = false;
  }

}
