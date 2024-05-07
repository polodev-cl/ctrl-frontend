import { AsyncPipe, Location, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { lastValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EquipmentService } from '@common/equipment/services/equipment.service';
import { RutFormatterDirective } from '@core/directives/rut-formatter.directive';
import { RutPipe } from '@core/pipes/rut.pipe';
import { Company, CompanyService } from '@app/services/company.service';
import { cleanIfNotValid, filterByValue, formatMAC, IPV4_PATTERN, MAC_PATTERN, } from '@app/utils/utils';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';
import { ModalResumenIngresoIndividualComponent } from '../Custom/modal-resumen-ingreso-individual/modal-resumen-ingreso-individual.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { Agency, AgencyService } from '../ingreso-individual/agency.service';
import { SoService, SOVersion } from '../ingreso-individual/so.service';
import { ModalAdvertenciaComponent } from '../Custom/modal-advertencia/modal-advertencia.component';

interface Option {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-editar-equipamiento',
  templateUrl: './editar-equipamiento.component.html',
  styleUrl: './editar-equipamiento.component.css',
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
    RutPipe,
    NavbarComponent,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    ModalAdvertenciaComponent,
    AsyncPipe
  ],
})

export class EditarEquipamientoComponent implements OnInit {
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
  selectorCompany: Observable<Partial<Company>[]> = of([]);
  selectorCompanyFiltered: Observable<Partial<Company>[]> = of([]);
  selectorAgency: Observable<Partial<Agency>[]> = of([]);
  selectorAgencyFiltered: Observable<Partial<Agency>[]> = of([]);
  selectorSistemasOperativos: SOVersion[] = [];
  selectorSistemasOperativosFiltered: SOVersion[] = [];
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = 'Hubo un error en su solicitud';
  tituloModalAdvertencia: string = 'Error';
  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  mostrarModalExito: boolean = false;
  mostrarModalResumenIngresoIndividual: boolean = false;
  datosParaModal: any = {};
  ingresoIndividualForm!: FormGroup;
  protected readonly cleanIfNotValid = cleanIfNotValid;
  private readonly _route = inject(ActivatedRoute);
  private readonly _equipment = this._route.snapshot.data['equipment'];

  constructor(
    private route: ActivatedRoute,
    private soService: SoService,
    private agencyService: AgencyService,
    private companyService: CompanyService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.selectorCompany = this.companyService.companiesSelector;
  }

  ngOnInit() {
    this.ingresoIndividualForm = this._loadForm(this._equipment);
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

  onTypeChange(value: string): void {
    if (this.isEquipmentWithNoOptions(value)) {
      this.ingresoIndividualForm.patchValue({
        // sistemaOperativo: { value: undefined, disabled: true },
        sistemaOperativo: undefined,
        sistemaOperativoVersion: undefined,
        procesador: undefined,
        ramGb: undefined,
        disco: undefined,
      });

      this.ingresoIndividualForm.get('sistemaOperativo')?.disable();
      this.ingresoIndividualForm.get('sistemaOperativoVersion')?.disable();
      this.ingresoIndividualForm.get('procesador')?.disable();
      this.ingresoIndividualForm.get('ramGb')?.disable();
      this.ingresoIndividualForm.get('disco')?.disable();
      this.ingresoIndividualForm.get('ddllTbk')?.disable();

      if (value === 'TBK') {
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
          disco: undefined,
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

  onMacBlur(): void {
    const macControl = this.ingresoIndividualForm.get('mac');
    if (macControl) {
      const formattedMac = formatMAC(macControl.value);
      macControl.setValue(formattedMac, { emitEvent: false });
    }
  }

  limitAndValidateIP(): void {
    const value = this.ingresoIndividualForm.get('ip')?.value;
    if (value && value.length > 39)
      this.ingresoIndividualForm.patchValue({ ip: value.substring(0, 39) });
  }


  abrirModalExito(): void {
    this.tituloModalExito = 'Editar Equipamiento';
    this.mensajeModalExito = 'Se ha modificado con éxito.';
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }

  abrirModalAdvertencia(mensaje: string): void {
    this.tituloModalAdvertencia = 'Error al ingresar usuario';
    this.mensajeModalAdvertencia = mensaje;
    this.mostrarModalAdvertencia = true;
  }

  loadSOData = () =>
    lastValueFrom(
      this.soService.getSODataByType(
        this.ingresoIndividualForm.get('tipo')?.value
      )
    ).then((soOptions) => {
      this.selectorSistemasOperativos = soOptions;
      this.selectorSistemasOperativosFiltered = soOptions;
      this.ingresoIndividualForm.patchValue({
        sistemaOperativoVersion: undefined,
        procesador: undefined,
        ramGb: undefined,
        disco: undefined,
      });
    });

  filter(field: 'agency' | 'company' | 'sistemaOperativo', target: any) {
    switch ( field ) {
      case 'agency': {
        this.selectorAgencyFiltered = this.selectorAgency.pipe(
          map((agencies) => filterByValue(agencies, target.value, 'nombre'))
        );
        break;
      }
      case 'company': {
        this.selectorCompanyFiltered =
          this.companyService.companiesSelector.pipe(
            map((companies) =>
              filterByValue(companies, target.value, 'razonSocial')
            )
          );
        break;
      }
      case 'sistemaOperativo': {
        this.selectorSistemasOperativosFiltered = filterByValue(
          this.selectorSistemasOperativos,
          target.value,
          'so'
        );
        break;
      }
    }
  }

  displayFnAgency = (agency: Agency) => (agency ? agency.nombre : '');

  onEmpresaChange(value: any): void {
    this.ingresoIndividualForm.patchValue({
      agenciaId: undefined,
      agenciaDpc: undefined,
      agenciaMnemonic: undefined,
    });

    if (value)
      lastValueFrom(this.agencyService.getAgenciesByCompanyId(+value))
        .then((agencies) => (this.selectorAgency = of(agencies)))
        .then(() => (this.selectorAgencyFiltered = this.selectorAgency))
        .then(() => this.ingresoIndividualForm.get('agenciaId')?.enable())
        .catch(console.error);
  }

  onAgencyChange(agency: Agency): void {
    this.ingresoIndividualForm.patchValue({
      agenciaDpc: agency?.dpc,
      agenciaMnemonic: agency?.nemonico,
    });
  }


  onSubmit() {
    if (this.ingresoIndividualForm.valid) {
      const equipmentData = this.ingresoIndividualForm.value;
      const equipmentId = this.route.snapshot.params['id']; // Asegúrate de que tienes el ID del equipamiento

      this.equipmentService.updateEquipment(equipmentId, equipmentData).subscribe(
        (response) => {
          console.log('Equipo creado con éxito', response);

        },
        (error) => {
          console.error('Error al crear el equipo', error);
          const errorMessage =
            error.error.message || 'Se produjo un error inesperado.';
          console.log('error: ', errorMessage);
          this.abrirModalAdvertencia(errorMessage);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }

  private _loadForm(equipment: any) { // Puedes reemplazar 'any' con 'Iequipment' si tienes definida esa interfaz
    return this.fb.group({
      fechaIngreso: [ equipment.fechaIngreso ? new Date(equipment.fechaIngreso) : undefined, [ Validators.required ] ],
      ordenCompra: [ equipment.ordenCompra || undefined, [ Validators.required ] ],
      rut: [ equipment.rut || undefined ],
      empresa: [ { value: equipment ? equipment.agencia?.empresa?.id : undefined, disabled: equipment } ],
      agenciaId: [ { value: equipment ? equipment.agencia : undefined, disabled: equipment } ],
      agenciaMnemonic: [ { value: equipment ? equipment.agenciaMnemonic : undefined, disabled: true } ],
      agenciaDpc: [ { value: equipment ? equipment.agenciaDpc : undefined, disabled: true } ],
      inventario: [ { value: equipment.inventario || undefined, disabled: equipment.inventario }, [ Validators.min(0) ] ],
      tipo: [ equipment ? equipment.tipo : undefined, [ Validators.required ] ],
      sistemaOperativo: [ equipment.sistemaOperativo || undefined ],
      uso: [ equipment.uso || undefined, [ Validators.required ] ],
      marca: [ equipment.marca || undefined, [ Validators.required ] ],
      modelo: [ equipment.modelo || undefined, [ Validators.required ] ],
      mac: [ { value: equipment.mac || undefined, disabled: equipment.mac }, [ Validators.pattern(MAC_PATTERN) ] ],
      ip: [ equipment.ip || undefined, [ Validators.pattern(IPV4_PATTERN) ] ],
      nombre: [ equipment.nombre || undefined, [ Validators.required ] ],
      procesador: [ equipment.procesador || undefined ],
      ramGb: [ equipment.ramGb || undefined, [ Validators.min(1) ] ],
      disco: [ equipment.disco || undefined ],
      ddllTbk: [{value: equipment.ddllTbk || undefined , disabled: equipment.tipo !== "TBK" } ],
      serie: [ { value: equipment.serie || undefined, disabled: equipment.serie } ],
      encargadoAgencia: [ equipment.encargadoAgencia || undefined, [ Validators.required ] ],
      ubicacion: [ equipment.ubicacion || undefined, [ Validators.required ] ],
      garantiaMeses: [ equipment ? equipment.garantiaMeses : undefined, [ Validators.required, Validators.min(1) ] ],
      estado: [ equipment.estado || 1 ], // Asegúrate de manejar el default adecuadamente
    });
  }
}
