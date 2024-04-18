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
  private apiUrl = 'https://nqyw4kymuud65aoxwslnl3jqhe0unvrn.lambda-url.us-east-1.on.aws/api/equipment';

  constructor(private http: HttpClient) {}


  obtenerEquipamiento(): Observable<Consulta[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        inventario: item.inventario,               // Número de inventario
        equipo: item.nombre,                       // Nombre del equipo
        dcp: item.ageDpc.toString(),               // DPC de la agencia convertido a string
        agencia: item.ageId.toString(),            // ID de la agencia convertido a string
        empresa: 'Nombre de la Empresa',           // Nombre de la empresa (estático)
        usuario: 'Nombre del Usuario',             // Nombre del usuario (estático)
        modelo: item.modelo                        // Modelo del equipo
      })))
    );
  }


  
}