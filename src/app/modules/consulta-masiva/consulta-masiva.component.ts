import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { lastValueFrom } from "rxjs";
import { Consulta } from "../../common/equipment/interfaces/consulta-equipment.interface";
import { ConsultaMasivaService } from '../../common/equipment/services/consulta-masiva.service';
import { FiltrosMasivaService } from '../../services/filtros-masiva.service';
import { TablasComponent } from '../Custom/tablas/tablas.component';
import { NavbarComponent } from "../shared/navbar/navbar.component";

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
    FormsModule,
    NavbarComponent,
    AsyncPipe,
    JsonPipe
  ]
})
export class ConsultaMasivaComponent implements OnInit {
  @ViewChild(TablasComponent, { static: false }) tablasComponent!: TablasComponent;

  filteredContent: Consulta[] = [];

  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta masiva', link: '/consulta-masiva' }
  ];

  agencyId: number;
  companyId: number;
  showTable = false;
  equipmentTypes: EquipmentType[] = [];
  systems: OperatingSystem[] = [];
  usages: string[] = [];
  selectedMachineType: string = '';
  selectedSystem: string = '';
  selectedUsage: string = '';

  constructor(
    private filtrosService: FiltrosMasivaService,
    private consultaMasivaService: ConsultaMasivaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const queryParams: { companyId: number, agencyId: number } = this.route.snapshot.queryParams as { companyId: number, agencyId: number };

    if (!queryParams.agencyId || !queryParams.companyId)
      this.router.navigate([ '/home' ])

    this.agencyId = +queryParams.agencyId;
    this.companyId = +queryParams.agencyId;
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
    if (!this.systems || !this.selectedSystem) {
      return [];
    }
    const selectedSystem = this.systems.find(system => system.name === this.selectedSystem);
    return selectedSystem ? selectedSystem.versions : [];
  }

  onEquipmentTypeChange() {
    const selectedEquipment = this.equipmentTypes.find(equipment => equipment.name === this.selectedMachineType);
    if (selectedEquipment && selectedEquipment.operatingSystems.length > 0) {
      this.systems = selectedEquipment.operatingSystems;
      this.selectedSystem = selectedEquipment.operatingSystems[0]?.name;
    } else {
      this.systems = [];
    }
  }

  async onSearch() {
    this.showTable = false;
    lastValueFrom(this.consultaMasivaService.obtenerEquipamientoFiltrado(
      this.companyId,
      this.agencyId,
      this.selectedMachineType,
      this.selectedSystem,
      this.selectedUsage
    )).then(data => this.filteredContent = data)
      .then(() => this.showTable = true)
      .catch(() => this.showTable = false);
  }
}
