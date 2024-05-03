import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
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
import { MatTooltip } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';

import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EquipmentService } from '@app/common/equipment/services/equipment.service';
import { lastValueFrom } from 'rxjs';

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
    MatTooltip,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './tabla-dpc.component.html',
  styleUrl: './tabla-dpc.component.css',
})
export class TablaDpcComponent implements AfterViewInit, OnChanges {
  @Input() equipments: any[] = [];
  @Input() dpc!: number;

  @Output() requestOpenModal = new EventEmitter<number>();
  dataSource = new MatTableDataSource<any>(this.equipments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'dpc',
    'equipo',
    'modelo',
    'garantia',
    'inventario',
    'agencia',
    'empresa',
    'usuario',
    'Acciones',
  ];

  constructor(private equipmentService: EquipmentService) {}

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


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipments']) {
      this.dataSource.data = this.equipments;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  getHistory(equipmentId: number) {
    console.log('ID ENVIADO', equipmentId);
    this.requestOpenModal.emit(equipmentId);
  }

  async exportToExcel() {
    const data = (
      await lastValueFrom(
        this.equipmentService.getEquipment({ agenciaDpc: this.dpc })
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
      "Encargado Agencia": equipment.encargadoAgencia || 'N/A',
      "Garantia Meses" : equipment.garantiaMeses || 'N/A',
      "Orden Compra": equipment.ordenCompra || 'N/A',
      "Fecha Ingreso" : equipment.fechaIngreso || 'N/A'


    }));

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [this.columns.map((col) => col.header)], {
      origin: 'A1',
      
    });

    // Añadir los datos de la tabla al worksheet comenzando desde la fila 2 (A2)
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    ws['!cols'] = this.columns.map((col) => ({ wch: col.wch }));
    ws['!autofilter'] = {ref : 'A1:Y1'}

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'ReporteFiltrado.xlsx');
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
