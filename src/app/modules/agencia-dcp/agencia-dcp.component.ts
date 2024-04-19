import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-agencia-dcp',
  templateUrl: './agencia-dcp.component.html',
  styleUrl: './agencia-dcp.component.css'
})
export class AgenciaDcpComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Agencia-dcp', link: '/data-agencia-dcp' },
  ];
  equipments: any[] = []; 
  agenciaDpc: number | null = null;
  mostrarModalHistorialEquipo: boolean = false;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.agenciaDpc = params['agenciaDpc']; // Captura el DPC desde los parámetros de ruta
      if (this.agenciaDpc) {
        this.buscarPorDpc(this.agenciaDpc);
      }
    });
  }

  buscarPorDpc(dpc: number): void {
    this.equipmentService.getEquipmentByDPC(dpc).subscribe({
      next: (data) => {
        this.equipments = data;
        console.log('Received equipments:', data);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.equipments = [];
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
