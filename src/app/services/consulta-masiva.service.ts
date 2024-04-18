// src/app/services/consulta-masiva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Equipamiento {
  inventario: number;
  nombre: string;
  ageId: number;
  ageDpc: number;
  empresa: string;
  usuario: string;
  modelo: string;
}

interface Consulta {
  inventario: number;
  equipo: string;
  dcp: string;
  agencia: string;
  empresa: string;
  usuario: string;
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