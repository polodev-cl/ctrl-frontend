import { AfterContentInit, Component, ContentChildren, Input, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { JsonPipe } from "@angular/common";

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
    JsonPipe
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
export class MaterialTableComponent<T> implements AfterContentInit {
  @Input() public dataSource!: MatTableDataSource<T>;
  @Input() public displayedColumns!: string[];
  @Input() public loading: Observable<boolean> = of(false);
  @Input() public trackByFn!: (index: number, item: any) => any;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.dataSource.data = this.dataSource.data;
  }
}
