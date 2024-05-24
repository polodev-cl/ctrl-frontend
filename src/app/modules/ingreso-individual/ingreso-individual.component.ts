import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { lastValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EquipmentService } from '../../common/equipment/services/equipment.service';
import { RutFormatterDirective } from '../../core/directives/rut-formatter.directive';
import { RutPipe } from '../../core/pipes/rut.pipe';
import { Company, CompanyService } from '../../services/company.service';
import {
  cleanEmptyFields,
  cleanIfNotValid,
  filterByValue,
  formatMAC,
  IPV4_PATTERN,
  MAC_PATTERN,
} from '../../utils/utils';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';
import { ModalResumenIngresoIndividualComponent } from '../Custom/modal-resumen-ingreso-individual/modal-resumen-ingreso-individual.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Agency, AgencyService } from './agency.service';
import { SoService, SOVersion } from './so.service';
import { ModalAdvertenciaComponent } from '../Custom/modal-advertencia/modal-advertencia.component';
import { UserService } from '@app/common/user/services/user.service';

interface Option {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-ingreso-individual',
  templateUrl: './ingreso-individual.component.html',
  styleUrls: ['./ingreso-individual.component.css'],
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
    NavbarComponent,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    ModalAdvertenciaComponent,
  ],
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
  ingresoIndividualForm: FormGroup;
  protected readonly cleanIfNotValid = cleanIfNotValid;
  firstName: any;
  lastName: any;

  constructor(
    private soService: SoService,
    private agencyService: AgencyService,
    private companyService: CompanyService,
    private equipmentService: EquipmentService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.ingresoIndividualForm = this._loadForm();
    this.selectorCompany = this.companyService.companiesSelector;
  }

  ngOnInit() {
    const userId = this.userService.getUserId(); 
    const firstName =  this.userService.getUserFirstName();
    const lastName =  this.userService.getUserLastName();
    this.firstName = firstName;
    this.lastName = lastName;
  

    this.selectorAgencyFiltered = this.selectorAgency;
  }

  onMacBlur(): void {
    const macControl = this.ingresoIndividualForm.get('mac');
    if (macControl) {
      const formattedMac = formatMAC(macControl.value);
      macControl.setValue(formattedMac, { emitEvent: false });
    }
  }

  filter(field: 'agency' | 'company' | 'sistemaOperativo', target: any) {
    switch (field) {
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

  limitAndValidateIP(): void {
    const value = this.ingresoIndividualForm.get('ip')?.value;
    if (value && value.length > 39)
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
    this.datosParaModal = {
      ...this.ingresoIndividualForm.getRawValue(),
      nombreUsuario: this.firstName,
      apellidoUsuario: this.lastName
      
    };
    console.log('Datos enviados al modal:', this.datosParaModal);
    this.mostrarModalResumenIngresoIndividual = true;
  }

  cerrarModalResumenIngresoIndividual(): void {
    this.mostrarModalResumenIngresoIndividual = false;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
  abrirModalAdvertencia(mensaje: string): void {
    this.tituloModalAdvertencia = 'Error al ingresar equipo';
    this.mensajeModalAdvertencia = mensaje;
    this.mostrarModalAdvertencia = true;
  }

  onSubmit() {
    if (this.ingresoIndividualForm.valid) {
      const values = cleanEmptyFields(this.ingresoIndividualForm.getRawValue());
      const formData = {
        ...values,
        usuarioIdCreacion: this.userService.getUserId(),
        agenciaId: values.agenciaId.id,
      };

      this.equipmentService.createEquipment(formData).subscribe(
        (response) => {
          console.log('Equipo creado con éxito', response);
          this.abrirModalResumenIngresoIndividual();
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

  displayFnAgency = (agency: Agency) => (agency ? agency.nombre : '');

  displayFnCompany = (company: Company) => (company ? company.razonSocial : '');

  private _loadForm() {
    return this.fb.group({
      fechaIngreso: [undefined, [Validators.required]],
      ordenCompra: [undefined, [Validators.required]],
      rut: [undefined],
      agenciaId: [{ value: undefined, disabled: true }],
      agenciaMnemonic: [{ value: undefined, disabled: true }],
      agenciaDpc: [{ value: undefined, disabled: true }],
      inventario: [undefined, [Validators.min(0)]],
      tipo: [undefined, [Validators.required]],
      sistemaOperativo: [undefined],
      uso: [undefined, [Validators.required]],
      marca: [undefined, [Validators.required]],
      modelo: [undefined, [Validators.required]],
      mac: [undefined, [Validators.pattern(MAC_PATTERN)]],
      ip: [undefined, [Validators.pattern(IPV4_PATTERN)]],
      nombre: [undefined, [Validators.required]],
      procesador: [undefined],
      ramGb: [undefined, [Validators.min(1)]],
      disco: [undefined],
      ddllTbk: [{ value: undefined, disabled: true }],
      serie: [undefined],
      encargadoAgencia: [undefined, [Validators.required]],
      ubicacion: [undefined, [Validators.required]],
      fechaCompra: [undefined, [Validators.required]],
      garantiaMeses: [undefined, [Validators.required, Validators.min(1)]],
      estado: [1],
    });
  }
}
