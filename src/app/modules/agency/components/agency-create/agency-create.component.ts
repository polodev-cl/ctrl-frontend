import { Component, inject, ViewChild } from '@angular/core';
import { AgencyFormComponent } from "@modules/agency/components/agency-form/agency-form.component";
import { AgencyService } from "@modules/ingreso-individual/agency.service";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalAdvertenciaComponent } from '@app/modules/Custom/modal-advertencia/modal-advertencia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agency-create',
  standalone: true,
  imports: [ AgencyFormComponent,
    ModalAdvertenciaComponent,
    CommonModule,
   ],
  templateUrl: './agency-create.component.html'
})
export class AgencyCreateComponent {
  private _router: Router = inject(Router);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = '';
  tituloModalAdvertencia: string = 'Error al actualizar la agencia';

  @ViewChild(AgencyFormComponent, { static: true }) agencyForm!: AgencyFormComponent;

  constructor(private readonly agencyService: AgencyService) {
  }

  onSubmit(form: IAgency) {
    this.agencyForm.agencyForm.disable();
    form.empId = form.empresa.id!;

    lastValueFrom(this.agencyService.createAgency(form))
      .then((res) => {
        this._matSnackBar.open('Agencia creada correctamente', 'Cerrar', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
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
