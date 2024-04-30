import { Component, inject } from '@angular/core';
import { AgencyFormComponent } from "@modules/agency/components/agency-form/agency-form.component";
import { AgencyService } from "@modules/ingreso-individual/agency.service";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-agency-create',
  standalone: true,
  imports: [ AgencyFormComponent ],
  templateUrl: './agency-create.component.html'
})
export class AgencyCreateComponent {
  private _router: Router = inject(Router);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);

  constructor(private readonly agencyService: AgencyService) {
  }

  onSubmit(form: IAgency) {
    form.empId = form.empresa.id!;

    lastValueFrom(this.agencyService.createAgency(form))
      .then((res) => {
        this._matSnackBar.open('Agencia creada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
        this._router.navigate([ '/agency' ], { queryParams: { id: res.id } }).then();
      });
  }
}
