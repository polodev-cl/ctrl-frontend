import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ConsultaMasivaService } from '../../../common/equipment/services/consulta-masiva.service';

interface Consulta {
  inventario: number;
  equipo: string;
  dcp: string;
  agencia: string;
  empresa: string;
  usuario: string;
  modelo: string;
}

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
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
})
export class TablasComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'inventario',
    'equipo',
    'dcp',
    'agencia',
    'empresa',
    'usuario',
    'modelo',
  ];
  dataSource = new MatTableDataSource<Consulta>();

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

  constructor(private consultaMasivaService: ConsultaMasivaService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  exportToExcel() {
    this.consultaMasivaService.obtenerEquipamientoCompleto().subscribe({
      next: (data) => {
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [this.columns.map((col) => col.header)], {
          origin: 'A1',
        });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
        ws['!cols'] = this.columns.map((col) => ({ wch: col.wch }));
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
        XLSX.writeFile(wb, 'ReporteCompleto.xlsx');
      },
      error: (error) => console.error('Error al exportar los datos:', error),
    });
  }
}
