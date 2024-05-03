import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Company, CompanyService } from '../../../services/company.service';
import { filterByValue } from "../../../utils/utils";
import { Agency, AgencyService } from '../../ingreso-individual/agency.service';

@Component({
  selector: 'app-modal-consulta-masiva',
  templateUrl: './modal-consulta-masiva.component.html',
  styleUrls: [ './modal-consulta-masiva.component.css' ],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe,
  ],
})
export class ModalConsultaMasivaComponent {
  @Output() cerrar = new EventEmitter<void>();
  modalForm: FormGroup;

  companies: Observable<Partial<Company>[]>;
  companiesFiltered: Observable<Partial<Company>[]> = of([]);
  agencies: Observable<Agency[]> = of([]);
  agenciesFiltered: Observable<Partial<Agency>[]> = of([]);

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly companyService: CompanyService,
    private readonly agencyService: AgencyService
  ) {
    this.companies = this.companyService.companiesSelector;
    this.companiesFiltered = this.companies;

    this.modalForm = this.fb.group({
      company: [ undefined, [ Validators.required ] ],
      agency: [ { value: undefined, disabled: true }, [ Validators.required ] ],
    });
  }

  filter(field: 'agency' | 'company', target: any) {
    switch ( field ) {
      case 'agency': {
        this.agenciesFiltered = this.agencies.pipe(
          map((agencies) => filterByValue(agencies, target.value, 'nombre'))
        );
        break;
      }
      case 'company': {
        this.companiesFiltered = this.companyService.companiesSelector.pipe(
          map((companies) => filterByValue<Partial<Company>>(companies, target.value, 'nombreCorto'))
        );
        break;
      }
    }
  }

  displayCompanyFn(company: Company) {
    return company ? company.nombreCorto : '';
  }

  displayAgencyFn(agency: Agency) {
    return agency ? agency.nombre : '';
  }

  onSelectCompany(company: Company) {
    this.modalForm.patchValue({ agency: undefined });
    this.modalForm.get('agency')?.disable();

    lastValueFrom(this.agencyService.getAgenciesByCompanyId(company.id))
      .then((agencies) => this.agencies = of(agencies))
      .then(() => this.agenciesFiltered = this.agencies)
      .finally(() => this.modalForm.get('agency')?.enable());
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

  irAConsultaMasiva() {
    const form = this.modalForm.getRawValue();
    const params = {
      agenciaId: form.agency.id,
      empresaId: form.company.id,
    }
    this.router.navigate([ '/consulta-masiva' ], { queryParams: params });
  }
}
