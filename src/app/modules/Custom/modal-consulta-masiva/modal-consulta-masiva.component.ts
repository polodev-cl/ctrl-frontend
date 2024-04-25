import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CompanyService, Company } from '../../../services/company.service';
import { Observable, lastValueFrom, of } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { Agency, AgencyService } from '../../ingreso-individual/agency.service';
@Component({
  selector: 'app-modal-consulta-masiva',
  templateUrl: './modal-consulta-masiva.component.html',
  styleUrls: ['./modal-consulta-masiva.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ModalConsultaMasivaComponent {
  @Output() cerrar = new EventEmitter<void>();
  modalForm: FormGroup;

  empresaControl = new FormControl();
  companies: Observable<Company[]>;
  agencies: Observable<Agency[]> = of([]);

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly companyService: CompanyService,
    private readonly agencyService: AgencyService
  ) {
    this.companies = this.companyService.companies;

    this.modalForm = this.fb.group({
      company: [undefined, [Validators.required]],
      agency: [{ value: undefined, disabled: true }, [Validators.required]],
    });
  }

  displayCompanyFn(company: Company) {
    return company ? company.razonSocial : '';
  }

  displayAgencyFn(agency: Agency) {
    return agency ? agency.nombre : '';
  }

  onSelectCompany(company: Company) {
    this.modalForm.patchValue({ agency: undefined });
    this.modalForm.get('agency')?.disable();

    lastValueFrom(this.agencyService.getAgenciesByCompanyId(company.id))
      .then((agencies) => {
        this.agencies = of(agencies);
      })
      .finally(() => this.modalForm.get('agency')?.enable());
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

  irAConsultaMasiva() {
    this.router.navigate(['/consulta-masiva']);
  }
}
