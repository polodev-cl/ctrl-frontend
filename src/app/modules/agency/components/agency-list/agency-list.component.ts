import { Component } from '@angular/core';
import {
  MatButton,
  MatFabAnchor,
  MatIconButton,
} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialTableComponent } from '@shared/material-table/material-table.component';
import { PaginatorModule } from 'primeng/paginator';
import { IAgency } from '@modules/agency/domain/interface/agency.interface';
import { lastValueFrom, Observable, of } from 'rxjs';
import { AgencyService } from '@modules/ingreso-individual/agency.service';
import { cleanObjectFields, updateQuerySate } from '@app/utils/utils';
import { CommonModule } from '@angular/common';
import { ModalEliminarEntitiesComponent } from '@app/modules/Custom/modal-eliminar-entities/modal-eliminar-entities.component';

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatError,
    MatFabAnchor,
    MatFormField,
    MatHeaderCell,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatMenu,
    MatMenuItem,
    MatTooltip,
    MaterialTableComponent,
    PaginatorModule,
    ReactiveFormsModule,
    MatHeaderCellDef,
    MatMenuTrigger,
    RouterLink,
    CommonModule,
    ModalEliminarEntitiesComponent
  ],
  templateUrl: './agency-list.component.html',
})
export class AgencyListComponent {

  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Agencias', link: '/agency' },
  ];
  public searchForm: FormGroup;
  public agencies: IAgency[] = [];
  public messageNoData: string =
    'Realizar una búsqueda para obtener resultados';
  public displayedColumns: string[] = [
    'id',
    'name',
    'nemonico',
    'dpc',
    'companyName',
    'actions',
  ];
  public loading: Observable<boolean> = of(false);
  mostrarModalEliminar: boolean = false;
  agencyIdParaEliminar: number | null = null;
  mensajeModalEliminar: string = "¿Estás seguro de que quieres eliminar esta agencia?";

  constructor(
    private readonly agencyService: AgencyService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    const queryParams = this.route.snapshot.queryParams;

    if (cleanObjectFields(queryParams))
      this.searchForm = this._loadForm(queryParams);
    else this.searchForm = this._loadForm();

    this.onSearch();
  }

  onSearch() {
    this.loading = of(true);
    this.messageNoData = 'Buscando agencias...';
    const values = cleanObjectFields(this.searchForm.getRawValue());

    updateQuerySate(this.router, this.route, values).then();

    lastValueFrom(this.agencyService.getAgencies(values as IAgency))
      .then((agencies) => {
        this.agencies = agencies;
        this.loading = of(false);
        this.messageNoData = 'No hay resultados que mostrar';
      })
      .catch((err) => {
        this.snackBar.open('Error al buscar agencias', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.loading = of(false);
        this.messageNoData = 'No hay resultados que mostrar';
      });
  }

  onDelete(agencyId: number) {
    this.agencyIdParaEliminar = agencyId;
    this.mostrarModalEliminar = true;
  }

  confirmarEliminacion() {
    if (this.agencyIdParaEliminar) {
      this.agencyService.deleteAgency(this.agencyIdParaEliminar).subscribe({
        next: () => {
          this.snackBar.open('Agencia eliminada', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.onSearch();
          this.cerrarModalEliminar();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar la agencia', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.error('Error al eliminar la agencia:', error);
          this.cerrarModalEliminar();
        }
      });
    }
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.agencyIdParaEliminar = null;
  }
  
  trackByIdFn(index: number, item: IAgency) {
    return item.id;
  }

  onCleanFilters() {
    this.searchForm.reset();
    updateQuerySate(this.router, this.route, {}).then();
  }

  private _loadForm(queryParams?: Partial<IAgency>) {
    return this.fb.group({
      id: [{ value: queryParams?.id || undefined, disabled: false }],
      nombre: [{ value: queryParams?.nombre || undefined, disabled: false }],
      nemonico: [
        { value: queryParams?.nemonico || undefined, disabled: false },
      ],
      dpc: [{ value: queryParams?.dpc || undefined, disabled: false }],
      // companyName: [ { value: queryParams?.empId || undefined, disabled: false } ]
    });
  }
}
