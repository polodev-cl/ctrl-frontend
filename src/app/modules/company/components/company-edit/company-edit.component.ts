import { Component, inject } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { ActivatedRoute } from "@angular/router";
import { JsonPipe } from "@angular/common";
import { ICompany } from "@modules/company/domain/interface/company.interface";

@Component({
  selector: 'app-company-edit',
  standalone: true,
  imports: [
    CompanyFormComponent,
    JsonPipe
  ],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent {
  private readonly _route = inject(ActivatedRoute);
  public company = this._route.snapshot.data['company'];

  onSubmit(formValue: ICompany) {
    console.log(formValue);
  }
}
