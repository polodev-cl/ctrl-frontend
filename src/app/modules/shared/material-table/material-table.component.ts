import { AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable, MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: 'material-table',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatNoDataRow,
    AsyncPipe,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
export class MaterialTableComponent<T> implements OnChanges, AfterContentInit {
  @Input() public data!: T[];
  @Input() public displayedColumns!: string[];
  @Input() public messageNoData: string = 'No hay resultados que mostrar';
  @Input() public loading: Observable<boolean> = of(false);
  @Input() public trackByFn!: (index: number, item: any) => any;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  public dataSource = new MatTableDataSource<T>();

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['data']?.currentValue !== (changes?.['data']?.previousValue || [])) {
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    }
  }
}
