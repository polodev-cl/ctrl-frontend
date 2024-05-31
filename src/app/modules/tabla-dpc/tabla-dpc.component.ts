import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EquipmentService } from '@app/common/equipment/services/equipment.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '@app/common/user/services/user.service';
import { RoleEnum } from '@app/common/auth/enums/role.enum';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { addMonths, differenceInMonths, parseISO } from 'date-fns';
import { EstatusEnum } from '@app/common/auth/enums/estatus.enum';

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
    NgIf
  ],
  templateUrl: './tabla-dpc.component.html',
  styleUrl: './tabla-dpc.component.css',
})
export class TablaDpcComponent implements AfterViewInit, OnChanges {
  @Input() equipments: any[] = [];
  @Input() dpc!: number;

  @Output() requestOpenModal = new EventEmitter<number>();
  dataSource = new MatTableDataSource<any>(this.equipments);
  RoleEnum = RoleEnum;
  rol!: RoleEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'dpc',
    'equipo',
    'estado',
    'modelo',
    'garantia',
    'inventario',
    'agencia',
    'empresa',
    'usuario',
    'Acciones',
  ];

  constructor(
    private equipmentService: EquipmentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rol = this.obtenerRolUsuario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipments']) {
      this.dataSource.data = this.equipments;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  calcularMesesGarantiaRestantes(fechaCompra: string, garantiaMeses: number): number {
    if (!fechaCompra || !garantiaMeses) {
      return 0;
    }

    const fechaCompraDate = parseISO(fechaCompra);
    const fechaFinGarantia = addMonths(fechaCompraDate, garantiaMeses);
    const fechaActual = new Date();
    const mesesRestantes = differenceInMonths(fechaFinGarantia, fechaActual);

    return mesesRestantes > 0 ? mesesRestantes : 0;
  }

  goToEdit(equipmentId: number) {
    this.router.navigate(['/editar-equipamiento', equipmentId]);
  }

  obtenerRolUsuario(): RoleEnum {
    return this.userService.getUserRole() as RoleEnum;
  }

  getHistory(equipmentId: number) {
    this.requestOpenModal.emit(equipmentId);
  }

  async exportToExcel() {
    const data = (
      await lastValueFrom(
        this.equipmentService.getEquipment({ agenciaDpc: this.dpc })
      )
    ).map((equipment) => ({
      Estado: this.mapEquipmentStatus(equipment.estado as number),
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
      'Encargado Agencia': equipment.encargadoAgencia || 'N/A',
      'Fecha Compra': equipment.fechaCompra || 'N/A',
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
    XLSX.writeFile(wb, 'ReporteFiltrado.xlsx');
  }

  private columns = [
    { header: 'Estado', wch: 15 },
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
    { header: 'Encargado Agencia', wch: 45 },
    { header: 'Fecha Compra', wch: 15 },
    { header: 'Garantia meses', wch: 15 },
    { header: 'Orden de compra numero', wch: 25 },
    { header: 'Fecha Ingreso', wch: 15 },
  ];

  private mapEquipmentStatus(status: number) {
    switch (status) {
      case EstatusEnum.INACTIVO:
        return 'BAJA';
      case EstatusEnum.ACTIVO:
        return 'ACTIVO';
      case EstatusEnum.BODEGA:
        return 'BODEGA';
      default:
        return 'N/A';
    }
  }
}
