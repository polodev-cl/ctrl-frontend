import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { RutPipe } from "../../../../core/pipes/rut.pipe";
import { CompanyService } from "@app/services/company.service";
import { MatCheckbox } from "@angular/material/checkbox";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [
    AsyncPipe,
    CalendarModule,
    FormsModule,
    InputTextModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    RutPipe,
    MatInputModule,
    MatFormFieldModule,
    MatCheckbox,
    RouterLink
  ],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css'
})
export class CompanyCreateComponent {

  createCompanyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.createCompanyForm = this._loadForm();
  }

  onSubmit() {

  }

  private _loadForm() {
    return this.fb.group({
      rut: [ undefined, [ Validators.required ] ],
      razonSocial: [ undefined, [ Validators.required ] ],
      nombreCorto: [ undefined, [ Validators.required ] ],
      giro: [ undefined, [ Validators.required ] ],
      domicilio: [ undefined, [ Validators.required ] ],
      comuna: [ undefined, [ Validators.required ] ],
      sitioWeb: [ undefined ],
      observaciones: [ undefined ],
      prestador: [ false, [ Validators.required ] ]
    })
  }
}
