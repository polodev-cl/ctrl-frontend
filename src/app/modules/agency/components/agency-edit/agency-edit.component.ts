import { Component, inject, ViewChild } from '@angular/core';
import { CompanyFormComponent } from "@modules/company/components/company-form/company-form.component";
import { AgencyFormComponent } from "@modules/agency/components/agency-form/agency-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AgencyService } from "@modules/ingreso-individual/agency.service";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'app-agency-edit',
  standalone: true,
  imports: [
    CompanyFormComponent,
    AgencyFormComponent
  ],
  templateUrl: './agency-edit.component.html'
})
export class AgencyEditComponent {
  private readonly _route = inject(ActivatedRoute);
  @ViewChild(AgencyFormComponent, { static: true }) agencyForm!: AgencyFormComponent;
  private readonly _router: Router = inject(Router);
  public agency = this._route.snapshot.data['agency'];
  private readonly _matSnackBar: MatSnackBar = inject(MatSnackBar);

  constructor(private readonly agencyService: AgencyService) {
  }

  onSubmit(form: IAgency) {
    this.agencyForm.agencyForm.disable();
    form.empId = form.empresa.id!;

    lastValueFrom(this.agencyService.createAgency(form))
      .then((res) => {
        this._matSnackBar.open('Agencia editada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        this._router.navigate([ '/agency' ], { queryParams: { id: res.id } }).then();
      })
      .catch((err) => {
        this._matSnackBar.open('Error al editar la agencia', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        throw err;
      })
      .finally(() => this.agencyForm.agencyForm.enable());
  }
}
