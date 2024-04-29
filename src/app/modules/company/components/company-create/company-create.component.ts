import { Component } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [ CompanyFormComponent ],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css'
})
export class CompanyCreateComponent {
  constructor() {
  }
}
