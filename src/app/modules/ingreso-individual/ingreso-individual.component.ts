import { Component, OnInit } from '@angular/core';
import { AgencyService, Company, Agency } from './AgencyService';
import { SOService, SOVersion } from './SOService';
import {
  checkIpAddress,
  formatAndValidateMAC,
  formatAndValidateDDLTBK,
} from '../../utils/utils';

interface Option {
  value: string;
  label: string;
}



@Component({
  selector: 'app-ingreso-individual',
  templateUrl: './ingreso-individual.component.html',
  styleUrls: ['./ingreso-individual.component.css'],
})
export class IngresoIndividualComponent implements OnInit {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingreso individual', link: '/ingreso-individual' },
  ];


  //empresas y agencias
  selectedType: string = ''; 
  selectedEmpresa: string | undefined = undefined;
  empresaOptions: Option[] = [];

  equipmentTypes: Option[] = [
    { value: 'PC', label: 'PC' },
    { value: 'Impresora', label: 'Impresora' },
    { value: 'Anexos', label: 'Anexos' },
    { value: 'Escaner', label: 'Escaner' },
    { value: 'LBM', label: 'LBM' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Notebook', label: 'Notebook' },
    { value: 'Pistola', label: 'Pistola' },
    { value: 'Print Server', label: 'Print Server' },
    { value: 'TBK', label: 'TBK' }
  ];
  agencies: Agency[] = [];
  selectedAgency?: Agency;
  dpcOptions: Option[] = [];
  nemonicoOptions: Option[] = [];
  selectedDPC: string = '';
  selectedNemonico: string = '';

  //equipo
  sistemasOperativos: SOVersion[] = [];
  selectedSO: string = '';
  versionesFiltradas: string[] = [];
  selectedVersion: string = '';
  procesador: string = '';
  ram: string = '';
  tipoDisco: string = '';

  constructor(
    private soService: SOService,
    private agencyService: AgencyService
  ) {}

  ngOnInit() {
    this.loadEmpresas();
    this.loadSOData();
  }
  isEquipmentWithNoOptions(type: string): boolean {
    return ['Impresora', 'Anexos', 'Escaner', 'LBM', 'Monitor', 'Pistola', 'Print Server', 'TBK'].includes(type);
  }
  loadEmpresas(): void {
    this.agencyService.getCompanies().subscribe({
      next: (companies) => {
        this.empresaOptions = companies.map((company) => ({
          value: company.id.toString(),
          label: company.razonSocial 
        }));
        console.log('Opciones de empresa configuradas:', this.empresaOptions);
      },
      error: (error) => {
        console.error('Error al cargar empresas:', error);
      },
    });
  }
  
  onEmpresaChange(): void {
    if (this.selectedEmpresa) {
      this.agencyService.getAgenciesByCompanyId(+this.selectedEmpresa).subscribe(agencies => {
        this.agencies = agencies;
        this.selectedAgency = undefined;
        this.dpcOptions = [];           
        this.nemonicoOptions = [];       
        this.selectedDPC = '';
        this.selectedNemonico = '';
      });
    }
  }
  onAgencyChange(): void {
    if (this.selectedAgency) {
      this.selectedDPC = this.selectedAgency.dpc.toString();
      this.selectedNemonico = this.selectedAgency.nemonico;
    }
  }
  resetSelections(): void {
    this.selectedDPC = '';
    this.selectedEmpresa = '';
    this.selectedNemonico = '';
  }

  ddlTbk: string = '';
  isValidDDLTBK: boolean | null = null;

  onDDLTBKInput(): void {
    const { formatted, isValid } = formatAndValidateDDLTBK(this.ddlTbk);
    this.ddlTbk = formatted;
    this.isValidDDLTBK = isValid;
  }
  onTypeChange(): void {
    if (this.isEquipmentWithNoOptions(this.selectedType)) {
      this.selectedSO = 'N/A';
      this.selectedVersion = 'N/A';
      this.procesador = 'N/A';
      this.ram = 'N/A';
      this.tipoDisco = 'N/A';
      if (this.selectedType !== 'TBK') {
        this.ddlTbk = 'N/A'; 
      }
    } else {
      this.loadSOData();
    }
  }
resetFields(): void {
  this.ddlTbk = this.selectedType === 'TBK' ? this.ddlTbk : 'N/A';
}
loadSOData(): void {
  this.soService.getSODataByType(this.selectedType).subscribe((soOptions: SOVersion[]) => {
    this.sistemasOperativos = soOptions;
    this.selectedSO = '';
    this.versionesFiltradas = [];
    this.selectedVersion = '';
    this.procesador = '';
    this.ram = '';
    this.tipoDisco = '';
  });
}
  getSelectedType(): string {
    return this.selectedType;
  }

  onSOChange(): void {
    const soSeleccionado = this.sistemasOperativos.find(
      (so) => so.so === this.selectedSO
    );
    this.versionesFiltradas = soSeleccionado ? soSeleccionado.versiones : [];
    this.selectedVersion = '';
  }

  macAddress: string = '';
  ipAddress: string = '';
  isValidIP: boolean | null = null;
  limitAndValidateIP(): void {
    if (this.ipAddress && this.ipAddress.length > 39) {
      this.ipAddress = this.ipAddress.substring(0, 39);
    }

    this.isValidIP = checkIpAddress(this.ipAddress);
  }

  isValidMAC: boolean | null = null;

  onMacInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    const { formattedMAC, isValid } = formatAndValidateMAC(value);
    this.macAddress = formattedMAC;
    this.isValidMAC = isValid;
  }

  tituloModalExito: string = '';
  mensajeModalExito: string = '';

  mostrarModalExito: boolean = false;
  mostrarModalResumenIngresoIndividual: boolean = false;

  abrirModalExito(): void {
    this.mostrarModalResumenIngresoIndividual = false;
    this.tituloModalExito = 'Ingreso Individual';
    this.mensajeModalExito = 'El ingreso individual se ha realizado con éxito.';
    this.mostrarModalExito = true;
  }

  abrirModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = true;
  }

  cerrarModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = false;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }
}
