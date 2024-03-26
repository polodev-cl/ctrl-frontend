import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface Consulta {
  nombreEquipo: string;
  codigoInventario: string;
  datosModificados: string[];
}

@Component({
  selector: 'app-tabla-equipos-duplicados',
  templateUrl: './tabla-equipos-duplicados.component.html',
  styleUrls: ['./tabla-equipos-duplicados.component.css']
})
export class TablaEquiposDuplicadosComponent implements AfterViewInit {
  @Input() data: Consulta[] = [];
  displayedColumns: string[] = ['nombreEquipo', 'codigoInventario', 'datosModificados'];
  dataSource = new MatTableDataSource<Consulta>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Consulta>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}

