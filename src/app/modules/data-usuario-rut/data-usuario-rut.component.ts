import { NgForOf, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { ModalHistorialEquipoComponent } from "../Custom/modal-historial-equipo/modal-historial-equipo.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-data-usuario-rut',
  templateUrl: './data-usuario-rut.component.html',
  styleUrls: [ './data-usuario-rut.component.css' ],
  standalone: true,
  imports: [
    ModalHistorialEquipoComponent,
    NgIf,
    DividerModule,
    RouterLink,
    ButtonModule,
    NgForOf,
    NavbarComponent
  ]
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
  equipoActualId: number | null = null;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rut = params['rut'];
      if ( this.rut ) {
        this.buscarPorRut(this.rut);
      }
    });
  }

  buscarPorRut(rut: string): void {
    this.equipmentService.getEquipmentByRut(rut).subscribe({
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
  abrirModalHistorialEquipo(equipmentId : number): void {
    this.equipoActualId = equipmentId;
    this.mostrarModalHistorialEquipo = true;
  }

  cerrarModalHistorialEquipo(): void {
    this.mostrarModalHistorialEquipo = false;
  }

}
