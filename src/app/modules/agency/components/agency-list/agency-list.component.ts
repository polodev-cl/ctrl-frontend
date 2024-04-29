import { Component } from '@angular/core';
import { MatButton, MatFabAnchor, MatIconButton } from "@angular/material/button";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef } from "@angular/material/table";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatTooltip } from "@angular/material/tooltip";
import { MaterialTableComponent } from "@shared/material-table/material-table.component";
import { PaginatorModule } from "primeng/paginator";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { lastValueFrom, Observable, of } from "rxjs";
import { AgencyService } from "@modules/ingreso-individual/agency.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { cleanObjectFields, updateQuerySate } from "@app/utils/utils";

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
    RouterLink
  ],
  templateUrl: './agency-list.component.html'
})
export class AgencyListComponent {
  public searchForm: FormGroup;
  public agencies: IAgency[] = [];
  public messageNoData: string = 'Realizar una búsqueda para obtener resultados';
  public displayedColumns: string[] = [ 'id', 'name', 'nemonico', 'dpc', 'companyName', 'actions' ];
  public loading: Observable<boolean> = of(false);

  constructor(private readonly agencyService: AgencyService,
              private readonly fb: FormBuilder,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    const queryParams = this.route.snapshot.queryParams;

    if (cleanObjectFields(queryParams))
      this.searchForm = this._loadForm(queryParams);
    else
      this.searchForm = this._loadForm();
  }

  onSearch() {
    this.loading = of(true);
    this.messageNoData = 'Buscando agencias...';
    const values = cleanObjectFields(this.searchForm.getRawValue());

    updateQuerySate(this.router, this.route, values);

    lastValueFrom(this.agencyService.getAgencies(values as IAgency))
      .then((agencies) => {
        this.agencies = agencies;
        this.loading = of(false);
        this.messageNoData = 'No hay resultados que mostrar';
      })
      .catch((err) => {
        this.snackBar.open('Error al buscar agencias', 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.loading = of(false);
        this.messageNoData = 'No hay resultados que mostrar';
      });
  }

  trackByIdFn(index: number, item: IAgency) {
    return item.id;
  }

  onCleanFilters() {
    this.searchForm.reset();
    updateQuerySate(this.router, this.route, {})
  }

  private _loadForm(queryParams?: Partial<IAgency>) {
    return this.fb.group({
      name: [ { value: queryParams?.name || undefined, disabled: false } ],
      nemonico: [ { value: queryParams?.nemonico || undefined, disabled: false } ],
      dpc: [ { value: queryParams?.dpc || undefined, disabled: false } ],
      companyName: [ { value: queryParams?.empId || undefined, disabled: false } ]
    });
  }
}
