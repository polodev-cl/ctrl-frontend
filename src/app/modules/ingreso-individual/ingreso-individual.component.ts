import { Component, OnInit } from '@angular/core';
import { AgencyService } from './AgencyService';
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

interface Agency {
  id: string;
  name: string;
  dcps: Option[];
  nemonicos: Option[];
}

interface Empresa {
  id: string;
  name: string;
  agencias: Agency[];
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

  selectedEmpresa: string | undefined = undefined;
  empresaOptions: Option[] = [];

  agencies: Agency[] = [];
  selectedAgency?: Agency;

  dcpOptions: Option[] = [];
  nemonicoOptions: Option[] = [];
  selectedDCP: string = '';
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
    this.agencyService.getEmpresas().subscribe((empresas) => {
      this.empresaOptions = empresas.map((empresa) => ({
        value: empresa.id,
        label: empresa.name,
      }));
    });
  }

  onEmpresaChange(): void {
    if (this.selectedEmpresa) {
      this.agencyService
        .getAgenciasPorEmpresa(this.selectedEmpresa)
        .subscribe((agencias) => {
          this.agencies = agencias;
          this.selectedAgency = undefined; // Resetear la agencia seleccionada
          // También deberías resetear las opciones de DCP y nemonico aquí, ya que la agencia anterior ya no es válida
          this.dcpOptions = [];
          this.nemonicoOptions = [];
          this.selectedDCP = '';
          this.selectedNemonico = '';
        });
    }
  }

  onAgencyChange(): void {
    if (this.selectedAgency) {
      this.dcpOptions = this.selectedAgency.dcps;
      this.nemonicoOptions = this.selectedAgency.nemonicos;
      // Aquí también podrías resetear o establecer por defecto los valores seleccionados para DCP y nemonico
      this.selectedDCP =
        this.dcpOptions.length > 0 ? this.dcpOptions[0].value : '';
      this.selectedNemonico =
        this.nemonicoOptions.length > 0 ? this.nemonicoOptions[0].value : '';
    }
  }

  resetSelections(): void {
    this.selectedDCP = '';
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

  loadSOData(): void {
    this.soService.getSOData().subscribe((datos) => {
      this.sistemasOperativos = datos;
    });
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
