import { NgForOf } from "@angular/common";
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';

export interface Consulta {
  nombreEquipo: string;
  codigoInventario: string;
  datosModificados: string[];
}

@Component({
  selector: 'app-tabla-equipos-duplicados',
  templateUrl: './tabla-equipos-duplicados.component.html',
  styleUrls: [ './tabla-equipos-duplicados.component.css' ],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatPaginator,
    NgForOf
  ]
})
export class TablaEquiposDuplicadosComponent implements AfterViewInit {
  @Input() data: Consulta[] = [];
  displayedColumns: string[] = [ 'nombreEquipo', 'codigoInventario', 'datosModificados' ];
  dataSource = new MatTableDataSource<Consulta>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Consulta>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}

