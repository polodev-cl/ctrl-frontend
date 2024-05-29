import { NgForOf, NgIf } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TablaDpcComponent } from '../tabla-dpc/tabla-dpc.component';
import { ModalHistorialEquipoComponent } from '../Custom/modal-historial-equipo/modal-historial-equipo.component';

@Component({
  selector: 'app-agencia-dcp',
  templateUrl: './agencia-dcp.component.html',
  styleUrl: './agencia-dcp.component.css',
  standalone: true,
  imports: [
    NgIf,
    DividerModule,
    NgForOf,
    RouterLink,
    ButtonModule,
    NavbarComponent,
    TablaDpcComponent,
    ModalHistorialEquipoComponent,
  ],
})
export class AgenciaDcpComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Agencia-dpc', link: '/data-agencia-dpc' },
  ];
  equipments: any[] = [];
  dpc?: number;

  agenciaDpc: number | null = null;
  mostrarModalHistorialEquipo: boolean = false;
  equipoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.agenciaDpc = params['agenciaDpc'];
      if (this.agenciaDpc) {
        this.buscarPorDpc(this.agenciaDpc);
        this.dpc = Number(this.agenciaDpc);
      }
    });
  }

  buscarPorDpc(dpc: number): void {
    this.equipmentService.getEquipmentByDPC(dpc).subscribe({
      next: (data) => {
        this.equipments = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.equipments = [];
      },
    });
  }

  openModalWithId(equipoId: number) {
    this.equipoId = equipoId;
    this.mostrarModalHistorialEquipo = true;
  }

  cerrarModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = false;
  }
}
