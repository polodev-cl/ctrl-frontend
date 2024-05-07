import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { ConsultaMasivaService } from '@app/common/equipment/services/consulta-masiva.service';
import { lastValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

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
    MatNoDataRow,
    CommonModule
  ],
})
export class TablasComponent implements OnChanges, AfterViewInit {
  displayedColumns: string[] = [
    'inventario',
    'equipo',
    'dcp',
    'agencia',
    'empresa',
    'usuario',
    'modelo',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  @Input() data: Consulta[] = [];

  @Input() companyId: number = 0;
  @Input() agencyId: number = 0;
  @Input() tipoEquipo: string = '';
  @Input() sistemaOperativo: string = '';
  @Input() uso: string = '';
  @Input() loading: boolean = false;

  dataSource = new MatTableDataSource<Consulta>();

  private columns = [
    { header: 'Empresa', wch: 25 },
    { header: 'Rut Usuario', wch: 20 },
    { header: 'Agencia Nombre', wch: 30 },
    { header: 'Nemonico', wch: 10 },
    { header: 'DPC', wch: 5 },
    { header: 'Uso', wch: 15 },
    { header: 'Ubicacion', wch: 35 },
    { header: 'Equipo', wch: 15 },
    { header: 'Marca', wch: 15 },
    { header: 'Modelo', wch: 30 },
    { header: 'Sistema Operativo', wch: 20 },
    { header: 'MAC', wch: 20 },
    { header: 'Nombre de Maquina', wch: 25 },
    { header: 'Procesador', wch: 20 },
    { header: 'RAM', wch: 5 },
    { header: 'SSD/HDD', wch: 10 },
    { header: 'IP', wch: 20 },
    { header: 'DDLL TBK', wch: 20 },
    { header: 'Numero serie', wch: 25 },
    { header: 'Numero inventario', wch: 25 },
    { header: 'Estado', wch: 15 },
    { header: 'Encargado Agencia', wch: 45 },
    { header: 'Garantia meses', wch: 15 },
    { header: 'Orden de compra numero', wch: 25 },
    { header: 'Fecha Ingreso', wch: 15 },
  ];

  constructor(private equipmentService: ConsultaMasivaService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  public cargarDatos(data: Consulta[]) {
    console.log(
      'Datos recibidos en TablasComponent para cargar en la tabla:',
      data
    );
    this.dataSource.data = data;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async exportToExcel() {
    try {
      this.loading = true;

      const data = (
        await lastValueFrom(
          this.equipmentService.getMassiveQuery(
            this.companyId,
            this.agencyId,
            this.tipoEquipo,
            this.sistemaOperativo,
            this.uso
          )
        )
      ).map((equipment) => ({
        Empresa: equipment.agencia?.empresa?.nombreCorto || 'N/A',
        RutUsuario: equipment.rut || 'N/A',
        AgenciaNombre: equipment.agencia?.nombre || 'N/A',
        Nemonico: equipment.agenciaMnemonic || 'N/A',
        DPC: equipment.agenciaDpc || 'N/A',
        Uso: equipment.uso || 'N/A',
        Ubicacion: equipment.ubicacion || 'N/A',
        Equipo: equipment.tipo || 'N/A',
        Marca: equipment.marca || 'N/A',
        Modelo: equipment.modelo || 'N/A',
        'Sistema Operativo': equipment.sistemaOperativo || 'N/A',
        MAC: equipment.mac || 'N/A',
        'Nombre Equipo': equipment.nombre || 'N/A',
        Procesador: equipment.procesador || 'N/A',
        Ram: equipment.ramGb || 'N/A',
        Disco: equipment.disco || 'N/A',
        Ip: equipment.ip || 'N/A',
        'DDL/TBK': equipment.ddllTbk || 'N/A',
        'Numero serie': equipment.serie || 'N/A',
        'Numero inventario': equipment.inventario || 'N/A',
        Estado: this.mapEquipmentStatus(equipment.estado as number),
        'Encargado Agencia': equipment.encargadoAgencia || 'N/A',
        'Garantia Meses': equipment.garantiaMeses || 'N/A',
        'Orden Compra': equipment.ordenCompra || 'N/A',
        'Fecha Ingreso': equipment.fechaIngreso || 'N/A',
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
      XLSX.utils.sheet_add_aoa(ws, [this.columns.map((col) => col.header)], {
        origin: 'A1',
      });

      // Añadir los datos de la tabla al worksheet comenzando desde la fila 2 (A2)
      XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
      ws['!cols'] = this.columns.map((col) => ({ wch: col.wch }));
      ws['!autofilter'] = { ref: 'A1:Y1' };

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
      XLSX.writeFile(wb, 'ConsultaMasiva.xlsx');
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    } finally {
      this.loading = false;
    }
  }

  private mapEquipmentStatus(status: number) {
    switch (status) {
      case 0:
        return 'BAJA';
      case 1:
        return 'ACTIVO';
      case 2:
        return 'BODEGA';
      default:
        return 'N/A';
    }
  }
}
