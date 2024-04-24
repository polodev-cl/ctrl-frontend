import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { ModalHistorialEquipoComponent } from "../Custom/modal-historial-equipo/modal-historial-equipo.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-numero-inventario',
  templateUrl: './numero-inventario.component.html',
  styleUrl: './numero-inventario.component.css',
  standalone: true,
  imports: [
    ModalHistorialEquipoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    NgForOf,
    ButtonModule,
    NavbarComponent
  ]
})
export class NumeroInventarioComponent {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta individual', link: '/consulta-individual' },
    { text: 'Número de inventario', link: '/data-numero-inventario' },
  ];
  equipments: any[] = [];
  inventario: number | null = null;
  mostrarModalHistorialEquipo: boolean = false;


  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.inventario = +params['inventario'];
      if ( this.inventario ) {
        this.buscarPorInventario(this.inventario);
      }
    });
  }

  buscarPorInventario(inventario: number): void {
    this.equipmentService.getEquipmentByInventory(inventario).subscribe({
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
