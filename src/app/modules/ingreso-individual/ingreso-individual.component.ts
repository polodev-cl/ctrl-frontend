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
  selectedType: string = ''; 
  selectedEmpresa: string | undefined = undefined;
  empresaOptions: Option[] = [];

  equipmentTypes: Option[] = [
    { value: 'PC', label: 'PC' },
    { value: 'Impresora', label: 'Impresora' },

  ];
  agencies: Agency[] = [];
  selectedAgency?: Agency;

  dpcOptions: Option[] = [];
  nemonicoOptions: Option[] = [];
  selectedDPC: string = '';
  selectedNemonico: string = '';

  sistemasOperativos: SOVersion[] = [];
  selectedSO: string = '';
  versionesFiltradas: string[] = [];
  selectedVersion: string = '';

  constructor(
    private soService: SOService,
    private agencyService: AgencyService
  ) {}

  ngOnInit() {
    this.loadEmpresas();
    this.loadSOData();
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
    this.soService.getSODataByType(this.selectedType).subscribe((soOptions: SOVersion[]) => {
      this.sistemasOperativos = soOptions;
      this.selectedSO = '';
      this.versionesFiltradas = [];
      this.selectedVersion = '';
    });
  }
  
  loadSOData(): void {
    // Asumiendo que tienes una forma de obtener el 'type' adecuado
    // Si no es así, necesitarás ajustar esta lógica para obtenerlo de alguna manera
    const type = this.getSelectedType();
    this.soService.getSODataByType(type).subscribe((soOptions: SOVersion[]) => {
      this.sistemasOperativos = soOptions;
    });
  }
  getSelectedType(): string {
    // Tu lógica para obtener el tipo seleccionado
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
