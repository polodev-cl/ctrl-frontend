  import { NgForOf, NgIf } from "@angular/common";
  import { Component, viewChild } from '@angular/core';
  import { ActivatedRoute, RouterLink } from '@angular/router';
  import { ButtonModule } from "primeng/button";
  import { DividerModule } from "primeng/divider";
  import { EquipmentService } from '../../common/equipment/services/equipment.service';
  import { ModalHistorialEquipoDcpComponent } from "../Custom/modal-historial-equipo-dcp/modal-historial-equipo-dcp.component";
  import { NavbarComponent } from "../shared/navbar/navbar.component";
  import { TablaDpcComponent } from "../tabla-dpc/tabla-dpc.component";

  @Component({
    selector: 'app-agencia-dcp',
    templateUrl: './agencia-dcp.component.html',
    styleUrl: './agencia-dcp.component.css',
    standalone: true,
    imports: [
      ModalHistorialEquipoDcpComponent,
      NgIf,
      DividerModule,
      NgForOf,
      RouterLink,
      ButtonModule,
      NavbarComponent,
      TablaDpcComponent
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
    mostrarModalHistorialEquipoDpc: boolean = false;
    historialEquipos: any[] = [];

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

    handleHistoryRequested(history: any[]): void {
      this.historialEquipos = history;  // Asigna los datos del historial al array
      this.abrirModalHistorialEquipoDpc();  // Abre el modal
    }
    
    abrirModalHistorialEquipoDpc(): void {
      this.mostrarModalHistorialEquipoDpc = true;  // Muestra el modal si hay datos
    }
    

    cerrarModalHistorialEquipoDpc(): void {
      this.mostrarModalHistorialEquipoDpc = false;
    }

    
  }
