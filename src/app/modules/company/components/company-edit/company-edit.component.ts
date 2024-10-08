import { Component, inject } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CompanyService } from "@app/services/company.service";
import { lastValueFrom } from "rxjs";
import { UpdateCompanyDto } from "@modules/company/domain/dto/update-company.dto";
import { ModalAdvertenciaComponent } from '@app/modules/Custom/modal-advertencia/modal-advertencia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-edit',
  standalone: true,
  imports: [ CompanyFormComponent,
    ModalAdvertenciaComponent,
    CommonModule
   ],
  templateUrl: './company-edit.component.html'
})
export class CompanyEditComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _companyService: CompanyService = inject(CompanyService);
  public company = this._route.snapshot.data['company'];
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = '';
  tituloModalAdvertencia: string = 'Error al actualizar la empresa';

  onSubmit(formValue: UpdateCompanyDto) {
    lastValueFrom(this._companyService.updateCompany(this.company.id, formValue))
      .then((res) => {
        this._matSnackBar.open('Empresa actualizada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        this._router.navigate([ '/company' ], { queryParams: { rut: res.rut } });
      })
      .catch((error) => {
        this.mensajeModalAdvertencia = error.error.message || 'Se produjo un error inesperado al actualizar la empresa.';
        this.mostrarModalAdvertencia = true;
      });
  }

  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
}
