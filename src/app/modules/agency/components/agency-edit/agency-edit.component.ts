import { Component, inject, ViewChild } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { AgencyFormComponent } from "@modules/agency/components/agency-form/agency-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AgencyService } from "@modules/ingreso-individual/agency.service";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { lastValueFrom } from "rxjs";
import { ModalAdvertenciaComponent } from '@app/modules/Custom/modal-advertencia/modal-advertencia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agency-edit',
  standalone: true,
  imports: [
    CompanyFormComponent,
    AgencyFormComponent,
    ModalAdvertenciaComponent,
    CommonModule
  ],
  templateUrl: './agency-edit.component.html'
})
export class AgencyEditComponent {
  private readonly _route = inject(ActivatedRoute);
  @ViewChild(AgencyFormComponent, { static: true }) agencyForm!: AgencyFormComponent;
  private readonly _router: Router = inject(Router);
  public agency = this._route.snapshot.data['agency'];
  private readonly _matSnackBar: MatSnackBar = inject(MatSnackBar);
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = '';
  tituloModalAdvertencia: string = 'Error al actualizar la agencia';

  constructor(private readonly agencyService: AgencyService) {
  }

  onSubmit(form: IAgency) {
    this.agencyForm.agencyForm.disable();
    form.empId = form.empresa.id!;

    lastValueFrom(this.agencyService.updateAgency(this.agency.id, form))
      .then((res) => {
        this._matSnackBar.open('Agencia editada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        this._router.navigate([ '/agency' ], { queryParams: { id: res.id } }).then();
      })
        .catch((err) => {
        this.mensajeModalAdvertencia = 'Error al editar la agencia: ' + (err.error?.message || 'Error desconocido');
        this.mostrarModalAdvertencia = true;
      })
      .finally(() => this.agencyForm.agencyForm.enable());
  }
  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
}
