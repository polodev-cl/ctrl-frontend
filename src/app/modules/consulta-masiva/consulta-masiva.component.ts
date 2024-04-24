import { NgForOf, NgIf } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ConsultaMasivaService } from '../../common/equipment/services/consulta-masiva.service';
import { FiltrosMasivaService } from '../../services/filtros-masiva.service';
import { TablasComponent } from '../Custom/tablas/tablas.component';

interface EquipmentType {
  name: string;
  operatingSystems: OperatingSystem[];
}

interface OperatingSystem {
  name: string;
  versions: string[];
}


@Component({
  selector: 'app-consulta-masiva',
  templateUrl: './consulta-masiva.component.html',
  styleUrls: [ './consulta-masiva.component.css' ],
  standalone: true,
  imports: [
    DividerModule,
    RouterLink,
    NgIf,
    NgForOf,
    ButtonModule,
    TablasComponent,
    FormsModule // Importa FormsModule aquí
  ]
})
export class ConsultaMasivaComponent implements OnInit {
  @ViewChild(TablasComponent, { static: false }) tablasComponent!: TablasComponent;



  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta masiva', link: '/consulta-masiva' }
  ];

  showTable = false;
  equipmentTypes: EquipmentType[] = [];
  systems: OperatingSystem[] = [];
  usages: string[] = [];
  selectedMachineType: string = '';
  selectedSystem: string = '';
  selectedVersion: string = '';
  selectedUsage: string = '';


  constructor(private filtrosService: FiltrosMasivaService, private consultaMasivaService: ConsultaMasivaService) {
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.filtrosService.getOptionData().subscribe(data => {
      this.equipmentTypes = data.equipmentTypes;
      this.systems = data.systems;
      this.usages = data.usages;
      console.log('Datos del JSON:', data);
    });
  }

  getVersions(): string[] {
    if ( !this.systems || !this.selectedSystem ) {
      return [];
    }
    const selectedSystem = this.systems.find(system => system.name === this.selectedSystem);
    return selectedSystem ? selectedSystem.versions : [];
  }

  onEquipmentTypeChange() {
    const selectedEquipment = this.equipmentTypes.find(equipment => equipment.name === this.selectedMachineType);
    if ( selectedEquipment && selectedEquipment.operatingSystems.length > 0 ) {
      this.systems = selectedEquipment.operatingSystems;
      this.selectedSystem = selectedEquipment.operatingSystems[0]?.name;
      this.selectedVersion = this.getVersions()[0] || 'N/A';
    } else {
      this.systems = [];
      this.selectedSystem = this.selectedVersion = 'N/A';
    }
  }

  onSearch() {
    this.consultaMasivaService.obtenerEquipamientoFiltrado(
      this.selectedMachineType,
      this.selectedSystem,
      this.selectedVersion,
      this.selectedUsage
    ).subscribe({
      next: (equipamiento) => {
        console.log('Equipamiento filtrado recibido del servicio:', equipamiento);
        this.showTable = true;
        setTimeout(() => {
          if (this.tablasComponent) {
            this.tablasComponent.cargarDatos(equipamiento);
          } else {
            console.error('TablasComponent no está disponible.');
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener el equipamiento filtrado:', error);
        this.showTable = false;
      }
    });
  }
  



}
