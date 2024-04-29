import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton, MatFabAnchor, MatIconButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { ButtonModule } from "primeng/button";
import { lastValueFrom, Observable, of } from "rxjs";

import { CompanyService } from "@app/services/company.service";
import { cleanObjectFields } from "@app/utils/utils";
import { CompanyQueryDto } from "@modules/company/dto/company-query.dto";
import { MaterialTableComponent } from "@shared/material-table/material-table.component";
import { MatToolbar } from "@angular/material/toolbar";
import { ICompany } from "@modules/company/domain/interface/company.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [ MatError, MaterialTableComponent, MatHeaderCell, MatHeaderCellDef, MatColumnDef, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatFormField, MatInput, MatLabel, MatIcon, MatButton, ReactiveFormsModule, MatMenuTrigger, MatMenu, MatIconButton, MatMenuItem, ButtonModule, RouterLink, MatTooltip, MatFabAnchor, MatToolbar, NgIf ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {
  public searchForm: FormGroup;
  public companies: ICompany[] = [];
  public messageNoData: string = 'Realizar una búsqueda para obtener resultados';
  public displayedColumns: string[] = [ 'id', 'rut', 'razonSocial', 'nombreCorto', 'comuna', 'actions' ];
  public loading: Observable<boolean> = of(false);

  @ViewChild(MaterialTableComponent) table!: MaterialTableComponent<ICompany>;

  constructor(private readonly companyService: CompanyService,
              private readonly fb: FormBuilder,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    const queryParams = this.route.snapshot.queryParams;

    if (cleanObjectFields<CompanyQueryDto>(queryParams)) {
      this.searchForm = this._loadForm(queryParams as Partial<ICompany>);
      this.onSearch();
    } else
      this.searchForm = this._loadForm();
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
        this.snackBar.open('Error al buscar las empresas', 'Cerrar', { duration: 5000 });
      })
  }

  onCleanFilters() {
    this.searchForm.reset();
    this._saveToState({});
  }

  trackByIdFn(index: number, item: ICompany) {
    return item.id;
  }

  private _saveToState(values: Partial<ICompany>) {
    this.router.navigate([], {
      queryParams: values,
      relativeTo: this.route
    }).then();
  }

  private _loadForm(state: Partial<ICompany> = {}): FormGroup {
    return this.fb.group({
      rut: [ state.rut, [ Validators.minLength(3) ] ],
      razonSocial: [ state.razonSocial ],
      nombreCorto: [ state.nombreCorto ],
    });
  }
}
