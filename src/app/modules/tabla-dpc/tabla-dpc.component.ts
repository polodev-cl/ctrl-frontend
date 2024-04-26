import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-dpc',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
  ],
  templateUrl: './tabla-dpc.component.html',
  styleUrl: './tabla-dpc.component.css',
})
export class TablaDpcComponent implements OnChanges {
  @Input() equipments: any[] = [];
  dataSource = new MatTableDataSource<any>(this.equipments);
  displayedColumns: string[] = [
    'dpc',
    'equipo',
    'modelo',
    'garantia',
    'inventario',
    'agencia',
    'empresa',
    'usuario',
    
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  private columns = [
    { header: 'Empresa', wch: 20 },
    { header: 'Rut Usuario', wch: 15 },
    { header: 'Agencia Nombre', wch: 30 },
    { header: 'Nemonico', wch: 10 },
    { header: 'DPC', wch: 5 },
    { header: 'caja', wch: 5 },
    { header: 'Ubicacion', wch: 35 },
    { header: 'Equipo', wch: 15 },
    { header: 'Marca', wch: 15 },
    { header: 'Modelo', wch: 20 },
    { header: 'Sistema Operativo', wch: 20 },
    { header: 'MAC', wch: 20 },
    { header: 'Nombre de Maquina', wch: 25 },
    { header: 'Procesador', wch: 20 },
    { header: 'RAM', wch: 5 },
    { header: 'SSD/HDD', wch: 10 },
    { header: 'IP', wch: 15 },
    { header: 'DDLL TBK', wch: 20 },
    { header: 'Numero serie', wch: 25 },
    { header: 'Estado', wch: 10 },
    { header: 'Encargado Agencia', wch: 45 },
    { header: 'Orden de compra numero', wch: 25 },
    { header: 'Fechas', wch: 10 },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipments']) {
      this.dataSource.data = this.equipments;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  exportToExcel() {
    // Usar dataSource.data para obtener los datos actuales mostrados en la tabla
    const data = this.dataSource.data;

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [ this.columns.map((col) => col.header) ], {
      origin: 'A1',
    });

    // Añadir los datos de la tabla al worksheet comenzando desde la fila 2 (A2)
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });

    // Configurar las anchuras de las columnas basadas en la configuración privada de 'columns'
    ws['!cols'] = this.columns.map((col) => ({ wch: col.wch }));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'ReporteFiltrado.xlsx');
  }
}
