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
  equipments: any[] = []; 
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
        this.equipments = data;  // Asegúrate de que data es un arreglo y se asigna correctamente
        console.log('Received equipments:', data);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.equipments = [];  // Asigna un arreglo vacío en caso de error
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
