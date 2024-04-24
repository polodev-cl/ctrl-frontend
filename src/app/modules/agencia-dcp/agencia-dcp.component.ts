import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { ModalHistorialEquipoComponent } from "../Custom/modal-historial-equipo/modal-historial-equipo.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-agencia-dcp',
  templateUrl: './agencia-dcp.component.html',
  styleUrl: './agencia-dcp.component.css',
  standalone: true,
  imports: [
    ModalHistorialEquipoComponent,
    NgIf,
    DividerModule,
    NgForOf,
    RouterLink,
    ButtonModule,
    NavbarComponent
  ]
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

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.agenciaDpc = params['agenciaDpc'];
      if ( this.agenciaDpc ) {
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
