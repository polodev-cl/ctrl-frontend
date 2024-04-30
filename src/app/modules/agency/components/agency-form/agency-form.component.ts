import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton, MatFabAnchor } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatTooltip } from "@angular/material/tooltip";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BackButtonDirective } from "@common/navigation/back-button.directive";
import { ButtonModule } from "primeng/button";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { AsyncPipe } from "@angular/common";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { Company, CompanyService } from "@app/services/company.service";
import { map } from "rxjs/operators";
import { filterByValue } from "@app/utils/utils";
import { Observable, of } from "rxjs";
import { ICompany } from "@modules/company/domain/interface/company.interface";

@Component({
  selector: 'app-agency-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFabAnchor,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    BackButtonDirective,
    ButtonModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption
  ],
  templateUrl: './agency-form.component.html'
})
export class AgencyFormComponent implements OnInit {
  @Input() submitText: string = 'Guardar';
  @Input() agency?: IAgency;
  @Output() onSubmit: EventEmitter<IAgency> = new EventEmitter<IAgency>();

  companies?: Observable<Partial<ICompany>[]>;
  companiesFiltered: Observable<Partial<ICompany>[]> = of([]);
  agencyForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly companyService: CompanyService) {
    this.companies = this.companyService.companiesSelector;
    this.companiesFiltered = this.companies;
  }

  ngOnInit(): void {
    this.agencyForm = this._loadForm(this.agency);
  }

  filter(field: 'agency' | 'company', target: any) {
    switch ( field ) {
      case 'company': {
        this.companiesFiltered = this.companyService.companiesSelector.pipe(
          map((companies) => filterByValue<Partial<Company>>(companies, target.value, 'nombreCorto'))
        );
        break;
      }
    }
  }

  onCompanySelect(company: Company) {
    this.agencyForm.patchValue({ empId: company.id });
  }

  displayCompanyFn = (company: Company) => company ? company.nombreCorto : '';

  private _loadForm(agency?: IAgency) {
    return this.fb.group({
      nombre: [ { value: agency?.nombre || undefined, disabled: !!agency }, [ Validators.required, Validators.minLength(4) ] ],
      nemonico: [ { value: agency?.nemonico || undefined, disabled: !!agency }, [ Validators.minLength(3) ] ],
      dpc: [ { value: agency?.dpc || undefined, disabled: !!agency }, [ Validators.min(0) ] ],
      empresa: [ { value: agency?.empresa || undefined, disabled: !!agency }, [ Validators.required ] ]
    });
  }
}
