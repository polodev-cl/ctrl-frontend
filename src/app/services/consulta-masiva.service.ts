// src/app/services/consulta-masiva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Equipamiento {
  id: number;
  fechaCreacion: string;
  fechaModificacion: string;
  estado: number;
  fechaIngreso: string;
  ordenCompra: string;
  rut: string;
  ageId: number;
  ageNemonico: string;
  ageDpc: number;
  inventario: number;
  tipo: string;
  sistemaOperativo: string;
  sistemaOperativoVersion: string;
  uso: string;
  marca: string;
  modelo: string;
  mac: string;
  ip: string;
  nombre: string;
  procesador: string;
  ramGb: number;
  disco: string;
  ddllTbk: string;
  serie: string;
  encargadoAgencia: string;
  ubicacion: string;
  garantiaMeses: number;
  fechaEliminacion?: any;
}

interface Consulta {
  inventario: number;
  equipo: string;
  dcp: string;
  agencia: string;
  empresa: string; // Asegúrate de que este campo está disponible o maneja un valor predeterminado
  usuario: string; // Asegúrate de que este campo está disponible o maneja un valor predeterminado
  modelo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaMasivaService {
  private apiUrl = 'https://44n9fvhnl0.execute-api.us-east-1.amazonaws.com/api/equipment';

  constructor(private http: HttpClient) {}


  obtenerEquipamiento(): Observable<Consulta[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        inventario: item.inventario,              
        equipo: item.nombre,       
        dcp: item.agenciaDpc ? item.agenciaDpc.toString() : '-', // DPC de la agencia convertido a string o valor predeterminado
        agencia: item.agenciaId ? item.agenciaId.toString() : '-',                         
        empresa: 'Nombre de la Empresa',          
        usuario: 'Nombre del Usuario',             
        modelo: item.modelo                        
      })))
    );
  }


  
}