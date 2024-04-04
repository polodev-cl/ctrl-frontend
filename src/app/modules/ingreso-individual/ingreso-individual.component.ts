import { Component, OnInit } from '@angular/core';
import { AgencyService } from './AgencyService';
import { SOService, SOVersion } from './SOService';

interface Option {
  value: string;
  label: string;
}

interface Agency {
  id: string;
  name: string;
  empresas: Option[];
  dcps: Option[];
  nemonicos: Option[];
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

  agencies: Agency[] = [];
  selectedAgency?: Agency;

  selectedDCP: string = '';
  selectedEmpresa: string = '';
  selectedNemonico: string = '';

  sistemasOperativos: SOVersion[] = [];
  selectedSO: string = '';
  versionesFiltradas: string[] = [];
  selectedVersion: string = '';

  empresaOptions: Option[] = [];
  dcpOptions: Option[] = [];
  nemonicoOptions: Option[] = [];

  constructor(
    private soService: SOService,
    private agencyService: AgencyService
  ) {}

  ngOnInit() {
    this.loadAgencies();
    this.loadSOData();
  }

  loadAgencies(): void {
    this.agencyService.getAgencies().subscribe((agencies) => {
      this.agencies = agencies; // Corrige esta línea
    });
  }

  onAgencyChange(): void {
    if (this.selectedAgency) {
      this.empresaOptions = this.selectedAgency.empresas;
      this.dcpOptions = this.selectedAgency.dcps;
      this.nemonicoOptions = this.selectedAgency.nemonicos;

      this.selectedEmpresa =
        this.empresaOptions.length > 0 ? this.empresaOptions[0].value : '';
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
