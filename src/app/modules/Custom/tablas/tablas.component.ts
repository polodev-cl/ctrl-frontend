import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

// Asegúrate de que tu interfaz Consulta esté

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
  styleUrl: './tablas.component.css'
})
export class TablasComponent  implements AfterViewInit {
  displayedColumns: string[] = ['inventario', 'equipo', 'dcp', 'agencia', 'empresa', 'usuario','modelo'];
  dataSource = new MatTableDataSource<Consulta>([
    { inventario: 101, equipo: 'Laptop Pro', dcp: 'DCP001', agencia: 'Agencia A', empresa: 'Empresa Uno', usuario: 'user01', modelo: 'X1000' },
  { inventario: 102, equipo: 'Desktop Power', dcp: 'DCP002', agencia: 'Agencia B', empresa: 'Empresa Dos', usuario: 'user02', modelo: 'D2000' },
  { inventario: 103, equipo: 'Monitor Ultra', dcp: 'DCP003', agencia: 'Agencia C', empresa: 'Empresa Tres', usuario: 'user03', modelo: 'M3000' },
  { inventario: 104, equipo: 'Server Max', dcp: 'DCP004', agencia: 'Agencia D', empresa: 'Empresa Cuatro', usuario: 'user04', modelo: 'S4000' },
  { inventario: 105, equipo: 'Printer Plus', dcp: 'DCP005', agencia: 'Agencia E', empresa: 'Empresa Cinco', usuario: 'user05', modelo: 'P5000' },
  { inventario: 106, equipo: 'Router Speed', dcp: 'DCP006', agencia: 'Agencia F', empresa: 'Empresa Seis', usuario: 'user06', modelo: 'R6000' },
  { inventario: 107, equipo: 'Switch Net', dcp: 'DCP007', agencia: 'Agencia G', empresa: 'Empresa Siete', usuario: 'user07', modelo: 'SW7000' },
  { inventario: 108, equipo: 'Laptop Lite', dcp: 'DCP008', agencia: 'Agencia H', empresa: 'Empresa Ocho', usuario: 'user08', modelo: 'L8000' },
  { inventario: 109, equipo: 'Tablet Touch', dcp: 'DCP009', agencia: 'Agencia I', empresa: 'Empresa Nueve', usuario: 'user09', modelo: 'T9000' },
  { inventario: 110, equipo: 'Smartphone Smart', dcp: 'DCP010', agencia: 'Agencia J', empresa: 'Empresa Diez', usuario: 'user10', modelo: 'SM10000' }
    // Agrega más usuarios según sea necesario
  ]);

 
  
  @Output() exportRequest = new EventEmitter<void>();

triggerExport() {
  this.exportRequest.emit();
}

exportToExcel(): void {
  console.log(this.dataSource.data); // Verifica los datos en la consola

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
  XLSX.writeFile(wb, 'Reporte.xlsx');
}



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
}
