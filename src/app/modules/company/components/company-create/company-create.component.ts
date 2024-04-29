import { Component, inject } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { CompanyService } from "@app/services/company.service";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateCompanyDto } from "@modules/company/domain/dto/create-company.dto";

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [ CompanyFormComponent ],
  templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {
  private _router: Router = inject(Router);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);

  constructor(private companyService: CompanyService) {
  }

  onSubmit(formValue: CreateCompanyDto) {
    lastValueFrom(this.companyService.createCompany(formValue))
      .then((res) => {
        this._matSnackBar.open('Empresa creada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        this._router.navigate([ '/company' ], { queryParams: { rut: res.rut } });
      });
  }
}
