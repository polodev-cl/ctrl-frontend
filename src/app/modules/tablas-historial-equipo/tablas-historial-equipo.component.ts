import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { NewlinePipe } from "../../common/pipes/newline.pipe";


@Component({
  selector: 'app-tablas-historial-equipo',
  templateUrl: './tablas-historial-equipo.component.html',
  styleUrls: [ './tablas-historial-equipo.component.css' ],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    NewlinePipe
  ]
})

export class TablasHistorialEquipoComponent implements OnInit {
  @Input() activaDataSource!: MatTableDataSource<Element>;
  displayedColumns: string[] = [ 'fecha', 'razonUsuario' ];

  ngOnInit() {
  }
}

// Variable para controlar cuál tabla se muestra

// ngOnInit() {
//   // Inicializa con uno de los DataSources
//   this.activaDataSource = this.inventarioDataSource;
// }


// Estructura de datos de ejemplo

// inventarioDataSource = new MatTableDataSource<Element>(ELEMENT_DATA1);
// dcpDataSource = new MatTableDataSource<Element>(ELEMENT_DATA2);
// rutDataSource = new MatTableDataSource<Element>(ELEMENT_DATA3);
export interface Element {
  fecha: string;
  razonUsuario: string;
}

// aqui empieza las tablas
export const ELEMENT_DATA1: Element[] = [
  {
    fecha: '15/04/2023',
    razonUsuario:
      'TABLA DE INVENTARIO Equipo por "Nicolas Álvarez" a través de carga masiva',
  },
  { fecha: '15/04/2023', razonUsuario: 'Incidente equipo ticket 103945' },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
];

export const ELEMENT_DATA2: Element[] = [
  {
    fecha: '15/04/2023',
    razonUsuario: 'TABLA DE DCP Equipo por "Nicolas Álvarez" a través de carga masiva',
  },
  { fecha: '15/04/2023', razonUsuario: 'Incidente equipo ticket 103945' },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
];

export const ELEMENT_DATA3: Element[] = [
  {
    fecha: '15/04/2023',
    razonUsuario: 'TABLA DE RUT Equipo por "Nicolas Álvarez" a través de carga masiva',
  },
  { fecha: '15/04/2023', razonUsuario: 'Incidente equipo ticket 103945' },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
  {
    fecha: '02/08/2023',
    razonUsuario:
      'Actualización base de datos de este equipo realizado por "Nicolas Álvarez". \n\nCampos actualizados: \n\n- DCP anterior: 454 \n\nObservaciones: Ninguna.',
  },
];

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if ( length === 0 || pageSize === 0 ) {
    return `0 de ${ length }`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${ startIndex + 1 } - ${ endIndex } de ${ length }`;
};

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Registro por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = spanishRangeLabel;

  return paginatorIntl;
}
