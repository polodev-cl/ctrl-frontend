import { Component, inject, ViewChild } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { CompanyService } from "@app/services/company.service";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateCompanyDto } from "@modules/company/domain/dto/create-company.dto";
import { ModalAdvertenciaComponent } from '@app/modules/Custom/modal-advertencia/modal-advertencia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [ CompanyFormComponent,
    ModalAdvertenciaComponent,
    CommonModule
  ],
  templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {
  private _router: Router = inject(Router);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = '';
  tituloModalAdvertencia: string = 'Error al crear la empresa';

  @ViewChild(CompanyFormComponent, { static: true }) companyForm!: CompanyFormComponent;

  constructor(private companyService: CompanyService) {
  }

  onSubmit(formValue: CreateCompanyDto) {
    this.companyForm.companyForm.disable();

    lastValueFrom(this.companyService.createCompany(formValue))
      .then((res) => {
        this._matSnackBar.open('Empresa creada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        this._router.navigate(['/company'], { queryParams: { rut: res.rut } });
      })
      .then(() => {
        lastValueFrom(this.companyService.getCompaniesSelector()).then();
      })
      .catch((error) => {
        this.mensajeModalAdvertencia = error.error.message || 'Se produjo un error inesperado al crear la empresa.';
        this.mostrarModalAdvertencia = true;
      });
  }
  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
}
