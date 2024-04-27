import { Component } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTableDataSource } from "@angular/material/table";
import { MaterialTableComponent } from "@shared/material-table/material-table.component";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { CompanyService } from "@app/services/company.service";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatFabAnchor, MatIconButton } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { cleanEmptyFields } from "@app/utils/utils";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { ButtonModule } from "primeng/button";
import { CompanyQueryDto } from "@modules/company/dto/company-query.dto";
import { lastValueFrom } from "rxjs";
import { MatTooltip } from "@angular/material/tooltip";

export interface Company {
  id: number,
  rut: string,
  razonSocial: string,
  nombreCorto: string,
  comuna: string
}

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [ MaterialTableComponent, MatHeaderCell, MatHeaderCellDef, MatColumnDef, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatFormField, MatInput, MatLabel, MatIcon, MatButton, ReactiveFormsModule, MatMenuTrigger, MatMenu, MatIconButton, MatMenuItem, ButtonModule, RouterLink, MatTooltip, MatFabAnchor ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {
  public searchForm: FormGroup;
  public displayedColumns: string[] = [ 'id', 'rut', 'razonSocial', 'nombreCorto', 'comuna', 'actions' ];
  public dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();
  private dummyData: Company[] = [
    { id: 1, rut: '12.345.678-9', razonSocial: 'Empresa de ejemplo S.A.', nombreCorto: 'Ejemplo S.A.', comuna: 'Santiago' },
    { id: 2, rut: '98.765.432-1', razonSocial: 'Otra empresa de ejemplo S.A.', nombreCorto: 'Otra Ejemplo S.A.', comuna: 'Santiago' }
  ]

  constructor(private readonly companyService: CompanyService,
              private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    this.dataSource.data = this.dummyData;
    const queryParams = this.route.snapshot.queryParams;
    this.searchForm = this._loadForm(queryParams as Partial<Company>);
  }

  onSearch() {
    const values = cleanEmptyFields(this.searchForm.getRawValue());

    this._saveToState(values);
    lastValueFrom(this.companyService.getCompanies(values as CompanyQueryDto))
      .then((companies) => this.dataSource.data = companies);
  }

  onCleanFilters() {
    this.searchForm.reset();
    this._saveToState({});
  }

  private _saveToState(values: Partial<Company>) {
    this.router.navigate([], {
      queryParams: values,
      relativeTo: this.route
    }).then();
  }

  private _loadForm(state: Partial<Company> = {}): FormGroup {
    return this.fb.group({
      rut: [ state.rut ],
      razonSocial: [ state.razonSocial ],
      nombreCorto: [ state.nombreCorto ],
    });
  }
}
