import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatButton,
  MatFabAnchor,
  MatIconButton,
} from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';

import { CompanyService } from '@app/services/company.service';
import { cleanObjectFields } from '@app/utils/utils';
import { CompanyQueryDto } from '@modules/company/domain/dto/company-query.dto';
import { MaterialTableComponent } from '@shared/material-table/material-table.component';
import { ICompany } from '@modules/company/domain/interface/company.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFabAnchor,
    MatTooltip,
    RouterLink,
    MaterialTableComponent,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatLabel,
    MatError,
  ],
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent {
  public searchForm: FormGroup;
  public companies: ICompany[] = [];
  public messageNoData: string =
    'Realizar una búsqueda para obtener resultados';
  public displayedColumns: string[] = [
    'id',
    'rut',
    'razonSocial',
    'nombreCorto',
    'comuna',
    'actions',
  ];
  public loading: Observable<boolean> = of(false);

  constructor(
    private readonly companyService: CompanyService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    const queryParams = this.route.snapshot.queryParams;

    if (cleanObjectFields<CompanyQueryDto>(queryParams))
      this.searchForm = this._loadForm(queryParams as Partial<ICompany>);
    else this.searchForm = this._loadForm();

    this.onSearch();
  }

  onSearch() {
    this.loading = of(true);
    this.messageNoData = 'Buscando empresas...';
    const values = cleanObjectFields(this.searchForm.getRawValue());

    this._saveToState(values);
    lastValueFrom(this.companyService.getCompanies(values as CompanyQueryDto))
      .then((companies) => {
        this.companies = companies;
        this.messageNoData = 'No hay resultados que mostrar';
        this.loading = of(false);
      })
      .catch(() => {
        this.companies = [];
        this.messageNoData = 'Error al buscar las empresas';
        this.snackBar.open('Error al buscar las empresas', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  onDelete(companyId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta empresa?')) {
      this.companyService.deleteCompany(companyId).subscribe({
        next: () => {
          this.snackBar.open('Empresa eliminada', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.onSearch();
        },
        error: (error) => {
          if (
            error.status === 409 &&
            error.error.message === 'COMPANY_HAVE_EQUIPMENT'
          ) {
            this.snackBar.open(
              'No se puede eliminar la empresa: Está asociada a equipos',
              'Cerrar',
              {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          } else {
            this.snackBar.open('Error al eliminar la empresa', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
          console.error('Error al eliminar la empresa:', error);
        },
      });
    }
  }

  onCleanFilters() {
    this.searchForm.reset();
    this._saveToState({});
  }

  trackByIdFn(index: number, item: ICompany) {
    return item.id;
  }

  private _saveToState(values: Partial<ICompany>) {
    this.router
      .navigate([], {
        queryParams: values,
        relativeTo: this.route,
      })
      .then();
  }

  private _loadForm(state: Partial<ICompany> = {}): FormGroup {
    return this.fb.group({
      rut: [state.rut, [Validators.minLength(3)]],
      razonSocial: [state.razonSocial],
      nombreCorto: [state.nombreCorto],
    });
  }

  protected readonly cleanObjectFields = cleanObjectFields;
}
