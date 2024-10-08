import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
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
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { RoleEnum } from '@app/common/auth/enums/role.enum';
import { ConsultaMasivaService } from '@app/common/equipment/services/consulta-masiva.service';
import { EquipmentService } from '@app/common/equipment/services/equipment.service';
import { UserService } from '@app/common/user/services/user.service';
import { lastValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

interface Consulta {
  id: number;
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
    CommonModule,
    MatTooltip,
    MatIconButton,
    MatIcon,
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
    'Acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() data: Consulta[] = [];

  @Input() companyId: number = 0;
  @Input() agencyId: number = 0;
  @Input() tipoEquipo: string = '';
  @Input() sistemaOperativo: string = '';
  @Input() uso: string = '';
  RoleEnum = RoleEnum;
  rol!: RoleEnum;

  dataSource = new MatTableDataSource<Consulta>();

  constructor(
    private consultaMasivaService: ConsultaMasivaService,
    private equipmentService: EquipmentService,
    private userService: UserService,
    private router: Router
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
  }

  ngOnInit() {
    this.rol = this.obtenerRolUsuario();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }


  goToEdit(equipmentId: number | undefined) {
    if (equipmentId) {
      this.router.navigate(['/editar-equipamiento', equipmentId]);
    } else {
      console.error("Equipment ID is undefined or not provided");
    }
  }



  obtenerRolUsuario(): RoleEnum {
    return this.userService.getUserRole();
  }


  public cargarDatos(data: Consulta[]) {
    this.dataSource.data = data;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async exportToExcel() {

    const data = (
      await lastValueFrom(
        this.consultaMasivaService.getMassiveQuery(this.companyId,
          this.agencyId,
          this.tipoEquipo,
          this.sistemaOperativo,
          this.uso)
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
      "Fecha Compra": equipment.fechaCompra || 'N/A',
      "Garantia Meses": equipment.garantiaMeses || 'N/A',
      "Orden Compra": equipment.ordenCompra || 'N/A',
      "Fecha Ingreso": equipment.fechaIngreso || 'N/A'


    }));


    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [this.columns.map((col) => col.header)], {
      origin: 'A1',

    });

    // Añadir los datos de la tabla al worksheet comenzando desde la fila 2 (A2)
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    ws['!cols'] = this.columns.map((col) => ({ wch: col.wch }));
    ws['!autofilter'] = { ref: 'A1:Y1' }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'ReporteFiltrado.xlsx');

  }

  private columns = [
    { header: 'EMPRESA', wch: 25 },
    { header: 'RUT USUARIO', wch: 20 },
    { header: 'AGENCIA', wch: 30 },
    { header: 'NEMONICO', wch: 10 },
    { header: 'DPC', wch: 5 },
    { header: 'USO', wch: 15 },
    { header: 'UBICACION', wch: 35 },
    { header: 'EQUIPO', wch: 15 },
    { header: 'MARCA', wch: 15 },
    { header: 'MODELO', wch: 30 },
    { header: 'SISTEMA OPERATIVO', wch: 20 },
    { header: 'MAC', wch: 20 },
    { header: 'NOMBRE EQUIPO', wch: 25 },
    { header: 'PROCESADOR', wch: 20 },
    { header: 'RAM', wch: 5 },
    { header: 'SSD/HDD', wch: 10 },
    { header: 'IP', wch: 20 },
    { header: 'DDLL TBK', wch: 20 },
    { header: 'NUMERO SERIE', wch: 25 },
    { header: 'NUMERO INVENTARIO', wch: 25 },
    { header: 'ESTADO', wch: 15 },
    { header: 'ENCARGADO AGENCIA', wch: 45 },
    { header: 'FECHA COMPRA', wch: 15 },
    { header: 'GARANTIA MESES', wch: 15 },
    { header: 'ORDEN COMPRA', wch: 25 },
    { header: 'FECHA INGRESO', wch: 15 },
  ];


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
