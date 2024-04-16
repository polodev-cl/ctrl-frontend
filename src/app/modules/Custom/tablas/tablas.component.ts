// src/app/components/tablas/tablas.component.ts
import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaMasivaService } from '../../../services/consulta-masiva.service';
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
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements AfterViewInit {
  displayedColumns: string[] = ['inventario', 'equipo', 'dcp', 'agencia', 'empresa', 'usuario', 'modelo'];
  dataSource = new MatTableDataSource<Consulta>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() exportRequest = new EventEmitter<void>();

  constructor(private consultaMasivaService: ConsultaMasivaService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarEquipamiento();
  }

  cargarEquipamiento() {
    this.consultaMasivaService.obtenerEquipamiento().subscribe({
      next: (equipamiento) => {
        this.dataSource.data = equipamiento;
      },
      error: (error) => {
        console.error('Error al obtener el equipamiento:', error);
      }
    });
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Reporte.xlsx');
  }

  triggerExport() {
    this.exportRequest.emit();
  }
}
