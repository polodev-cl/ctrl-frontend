import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { CalendarModule } from "primeng/calendar";
import { DividerModule } from "primeng/divider";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { lastValueFrom } from "rxjs";
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { RutFormatterDirective } from "../../core/directives/rut-formatter.directive";
import { RutPipe } from "../../core/pipes/rut.pipe";
import { formatDDLTBK, formatMAC, IPV4_PATTERN, MAC_PATTERN, } from '../../utils/utils';
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";
import { ModalResumenIngresoIndividualComponent } from "../Custom/modal-resumen-ingreso-individual/modal-resumen-ingreso-individual.component";
import { Agency, AgencyService } from './agency.service';
import { SoService, SOVersion } from './so.service';
import { NavbarComponent } from "../shared/navbar/navbar.component";

interface Option {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-ingreso-individual',
  templateUrl: './ingreso-individual.component.html',
  styleUrls: [ './ingreso-individual.component.css' ],
  standalone: true,
  imports: [
    ModalExitosoComponent,
    DividerModule,
    ModalResumenIngresoIndividualComponent,
    NgIf,
    RouterLink,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    InputTextModule,
    NgClass,
    RutFormatterDirective,
    FloatLabelModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    JsonPipe,
    RutPipe,
    NavbarComponent
  ]
})
export class IngresoIndividualComponent implements OnInit {
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Ingreso individual', link: '/ingreso-individual' },
  ];
  selectedType: string = '';

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
    { value: 'TBK', label: 'TBK' },
  ];

  selectorEmpresas: Option[] = [];
  selectorAgencies: Agency[] = [];
  selectorDpcOptions: Option[] = [];
  selectorNemonicoOptions: Option[] = [];
  selectorSistemasOperativos: SOVersion[] = [];
  selectorVersionesFiltradas: string[] = [];
  

  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  mostrarModalExito: boolean = false;
  mostrarModalResumenIngresoIndividual: boolean = false;
  datosParaModal: any = {};
  ingresoIndividualForm: FormGroup;

  constructor(
    private soService: SoService,
    private agencyService: AgencyService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
  ) {
    this.ingresoIndividualForm = this.fb.group({
      fechaIngreso: [ undefined, [ Validators.required ] ],
      ordenCompra: [ undefined, [ Validators.required ] ],
      rut: [ undefined ],
      agenciaId: [ { value: undefined, disabled: true } ],
      agenciaMnemonic: [ { value: undefined, disabled: true } ],
      agenciaDpc: [ { value: undefined, disabled: true } ],
      inventario: [ undefined, [ Validators.min(0) ] ],
      tipo: [ undefined, [ Validators.required ] ],
      sistemaOperativo: [ undefined ],
      sistemaOperativoVersion: [ undefined ],
      uso: [ undefined, [ Validators.required ] ],
      marca: [ undefined, [ Validators.required ] ],
      modelo: [ undefined, [ Validators.required ] ],
      // mac: [ undefined, [ Validators.pattern(MAC_PATTERN) ] ],
      mac : ["00:1B:44:11:3A:B7"],
      ip: [ undefined, [ Validators.pattern(IPV4_PATTERN) ] ],
      nombre: [ undefined, [ Validators.required ] ],
      procesador: [ undefined ],
      ramGb: [ undefined, [ Validators.min(1) ] ],
      disco: [ undefined ],
      ddllTbk: [ { value: undefined, disabled: true } ],
      serie: [ undefined ],
      encargadoAgencia: [ undefined, [ Validators.required ] ],
      ubicacion: [ undefined, [ Validators.required ] ],
      garantiaMeses: [ undefined, [ Validators.required, Validators.min(1) ] ],
      estado: [1],
    });
  }

  ngOnInit() {
    this.loadEmpresas();
    console.log(this.ingresoIndividualForm.get('agenciaDpc')?.value)
    this.ingresoIndividualForm.get('agenciaDpc')?.valueChanges.subscribe(console.log);
    // this.loadSOData();
  }

  isEquipmentWithNoOptions(type: string): boolean {
    return [
      'Impresora',
      'Anexos',
      'Escaner',
      'LBM',
      'Monitor',
      'Pistola',
      'Print Server',
      'TBK',
    ].includes(type);
  }

  loadEmpresas = () =>
    lastValueFrom(this.agencyService.getCompanies())
      .then((companies) => {
        this.selectorEmpresas = companies.map((company) => ({
          value: company.id,
          label: company.razonSocial,
        }));
        console.log('Empresas', this.selectorEmpresas)
      }).catch(console.error);

  onEmpresaChange(value: any): void {
    if ( value )
      lastValueFrom(this.agencyService.getAgenciesByCompanyId(+value)).then((agencies) => {
        console.log('Agencias', agencies)
        this.selectorAgencies = agencies;
        this.selectorDpcOptions = [];
        this.selectorNemonicoOptions = [];
        this.ingresoIndividualForm.patchValue({
          agenciaId: undefined,
          agenciaDpc: undefined,
          agenciaMnemonic: undefined,
        });
        this.ingresoIndividualForm.get('agenciaId')?.enable();
      }).catch(console.error);
  }

  onAgencyChange(): void {
    const agencyId = this.ingresoIndividualForm.get('agenciaId')?.value;

    if ( agencyId ) {
      const agency = this.selectorAgencies.find((agency) => agency.id === agencyId);
      this.ingresoIndividualForm.patchValue({
        agenciaDpc: agency?.dpc,
        agenciaMnemonic: agency?.nemonico,
      })
    }
  }

  onDDLTBKInput(): void { // TODO: usar valueChanges
    const formatDDLTBKValue = formatDDLTBK(this.ingresoIndividualForm.get('ddlTbk')?.value);
    this.ingresoIndividualForm.patchValue({
      ddllTbk: formatDDLTBK(this.ingresoIndividualForm.get('ddlTbk')?.value),
    });
  }

  onTypeChange(value: string): void {
    if ( this.isEquipmentWithNoOptions(value) ) {
      this.ingresoIndividualForm.patchValue({
        // sistemaOperativo: { value: undefined, disabled: true },
        sistemaOperativo: undefined,
        sistemaOperativoVersion: undefined,
        procesador: undefined,
        ramGb: undefined,
        disco: undefined
      });

      this.ingresoIndividualForm.get('sistemaOperativo')?.disable();
      this.ingresoIndividualForm.get('sistemaOperativoVersion')?.disable();
      this.ingresoIndividualForm.get('procesador')?.disable();
      this.ingresoIndividualForm.get('ramGb')?.disable();
      this.ingresoIndividualForm.get('disco')?.disable();
      this.ingresoIndividualForm.get('ddllTbk')?.disable();

      if ( value === 'TBK' ) {
        this.ingresoIndividualForm.patchValue({
          ddllTbk: undefined,
        });
        this.ingresoIndividualForm.get('ddllTbk')?.enable();
      }
    } else {
      this.loadSOData().then(() => {
        this.ingresoIndividualForm.patchValue({
          // sistemaOperativo: { value: undefined, disabled: true },
          sistemaOperativo: undefined,
          sistemaOperativoVersion: undefined,
          procesador: undefined,
          ramGb: undefined,
          disco: undefined
        });

        this.ingresoIndividualForm.get('sistemaOperativo')?.enable();
        this.ingresoIndividualForm.get('sistemaOperativoVersion')?.enable();
        this.ingresoIndividualForm.get('procesador')?.enable();
        this.ingresoIndividualForm.get('ramGb')?.enable();
        this.ingresoIndividualForm.get('disco')?.enable();
        this.ingresoIndividualForm.get('ddllTbk')?.disable();
      });

    }
  }

  loadSOData = () =>
    lastValueFrom(this.soService.getSODataByType(this.ingresoIndividualForm.get('tipo')?.value)).then((soOptions) => {
      this.selectorSistemasOperativos = soOptions;
      this.ingresoIndividualForm.patchValue({
        sistemaOperativoVersion: undefined,
        procesador: undefined,
        ramGb: undefined,
        disco: undefined
      });
    })

  onSOChange(value: string): void {
    const soSeleccionado = this.selectorSistemasOperativos.find(
      (so) => so.so === value
    );

    this.selectorVersionesFiltradas = soSeleccionado ? soSeleccionado.versiones : [];
    this.ingresoIndividualForm.patchValue({ sistemaOperativoVersion: undefined });
  }

  limitAndValidateIP(): void {
    const value = this.ingresoIndividualForm.get('ip')?.value;
    if ( value && value.length > 39 )
      this.ingresoIndividualForm.patchValue({ ip: value.substring(0, 39) });
  }

  onMacInput() {
    const value = this.ingresoIndividualForm.get('mac')?.value;
    return value ? formatMAC(value) : value;
  }

  abrirModalExito(): void {
    this.mostrarModalResumenIngresoIndividual = false;
    this.tituloModalExito = 'Ingreso Individual';
    this.mensajeModalExito = 'El ingreso individual se ha realizado con éxito.';
    this.mostrarModalExito = true;
  }

  abrirModalResumenIngresoIndividual(): void {
    this.datosParaModal = this.ingresoIndividualForm.getRawValue(); // Preparar los datos para el modal
    this.mostrarModalResumenIngresoIndividual = true;
  }
  cerrarModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = false;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  onSubmit() {
    if ( this.ingresoIndividualForm.valid ) {
      const formData = this.ingresoIndividualForm.getRawValue();
      console.log('Formulario válido', formData);

      if ( this.isEquipmentWithNoOptions(this.selectedType) ) {
        formData.sistemaOperativo = "N/A";
        formData.sistemaOperativoVersion = "N/A";
        formData.procesador = "N/A";
        formData.ramGb = "N/A";
        formData.disco = "N/A";
      }
      this.equipmentService.createEquipment(formData).subscribe(
        response => {
          console.log('Equipo creado con éxito', response);
        },
        error => {
          console.error('Error al crear el equipo', error);
        }
      );
    }
  }
}
