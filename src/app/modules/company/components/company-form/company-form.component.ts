import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

import { BackButtonDirective } from "@common/navigation/back-button.directive";
import { ICompany } from "@modules/company/domain/interface/company.interface";

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    BackButtonDirective,
    ButtonModule,
    InputTextModule,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
  @Input() company?: ICompany | undefined;
  @Input() submitText: string = 'Guardar';
  @Output() onSubmit: EventEmitter<ICompany> = new EventEmitter<ICompany>();
  companyForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.companyForm = this._loadForm(this.company);
  }

  private _loadForm(companyDto?: ICompany) {
    return this.fb.group({
      rut: [ { value: companyDto?.rut || undefined, disabled: !!companyDto }, [ Validators.required ] ],
      razonSocial: [ { value: companyDto?.razonSocial || undefined, disabled: !!companyDto }, [ Validators.required ] ],
      nombreCorto: [ { value: companyDto?.nombreCorto || undefined, disabled: !!companyDto }, [ Validators.required ] ],
      giro: [ { value: companyDto?.giro || undefined, disabled: !!companyDto }, [ Validators.required ] ],
      domicilio: [ { value: companyDto?.domicilio || undefined, disabled: false }, [ Validators.required ] ],
      comuna: [ { value: companyDto?.comuna || undefined, disabled: false }, [ Validators.required ] ],
      sitioWeb: [ { value: companyDto?.sitioWeb || undefined, disabled: false } ],
      observaciones: [ { value: companyDto?.observaciones || undefined, disabled: false } ],
      prestador: [ { value: companyDto?.prestador || undefined, disabled: false }, [ Validators.required ] ]
    })
  }
}
