import { Component, Input, OnInit, ViewChild,AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { NewlinePipe } from "../../core/pipes/newline.pipe";
import { HistorialEquipment } from '@app/common/equipment/interfaces/equipamiento.interface';
import { CommonModule } from '@angular/common';

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
    NewlinePipe,
    CommonModule
    
  ]
})

export class TablasHistorialEquipoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dataSource!: MatTableDataSource<HistorialEquipment>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['fechaCreacion', 'nombresUsuario', 'descripcion'];


  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.paginator) {
      const change = changes['dataSource'];
      if (change.currentValue !== change.previousValue) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }
}

export function getSpanishPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Registro por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = spanishRangeLabel;
  return paginatorIntl;
}

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }
  const startIndex = page * pageSize;
  const endIndex = Math.min(startIndex + pageSize, length);
  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export { NewlinePipe };
