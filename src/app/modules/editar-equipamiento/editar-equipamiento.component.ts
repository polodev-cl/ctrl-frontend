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
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { Agency, AgencyService } from '../ingreso-individual/agency.service';
import { SoService, SOVersion } from '../ingreso-individual/so.service';
import { ModalAdvertenciaComponent } from '../Custom/modal-advertencia/modal-advertencia.component';
import { UserService } from '@app/common/user/services/user.service';


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
  ingresoIndividualForm: FormGroup;
  protected readonly cleanIfNotValid = cleanIfNotValid;
  firstName: any;
  lastName: any;
  

  constructor(
    private route: ActivatedRoute,
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
    console.log('ID del usuario activo:', userId);
    console.log('Nombre:', firstName, 'Apellido:', lastName);
    this.firstName = firstName;
    this.lastName = lastName;
  

    this.selectorAgencyFiltered = this.selectorAgency;


    const equipmentId = this.route.snapshot.params['id'];
    console.log(equipmentId)

    this.equipmentService.getEquipmentById(equipmentId).subscribe({
      next: (equipment) => {
        this.ingresoIndividualForm.patchValue({
          fechaIngreso: equipment.fechaIngreso,
          ordenCompra: equipment.ordenCompra,
          rut: equipment.rut,
          agenciaId: equipment.agenciaId,
          agenciaMnemonic: equipment.agenciaMnemonic,
          agenciaDpc: equipment.agenciaDpc,
          inventario: equipment.inventario,
          tipo: equipment.tipo,
          sistemaOperativo: equipment.sistemaOperativo,
          uso: equipment.uso,
          marca: equipment.marca,
          modelo: equipment.modelo,
          mac: equipment.mac,
          ip: equipment.ip,
          nombre: equipment.nombre,
          procesador: equipment.procesador,
          ramGb: equipment.ramGb,
          disco: equipment.disco,
          ddllTbk: equipment.ddllTbk,
          serie: equipment.serie,
          encargadoAgencia: equipment.encargadoAgencia,
          ubicacion: equipment.ubicacion,
          garantiaMeses: equipment.garantiaMeses
        });
        this.loadRelatedData(equipment);
      },
      error: (error) => console.error('Error al cargar el equipamiento', error)
    });
    
  }

  private loadRelatedData(equipment: any) {
    this.agencyService.getAgenciesByCompanyId(equipment.companyId).subscribe({
      next: (agencies) => {
        this.selectorAgency = of(agencies);
        this.selectorAgencyFiltered = this.selectorAgency;
      }
    });
  }


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
      garantiaMeses: [undefined, [Validators.required, Validators.min(1)]],
      estado: [1],
    });
  }
}
