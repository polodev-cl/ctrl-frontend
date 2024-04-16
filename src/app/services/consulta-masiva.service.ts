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
  private apiUrl = 'http://127.0.0.1:3000/api/equipment';

  constructor(private http: HttpClient) {}

  obtenerEquipamiento(): Observable<Consulta[]> {
    return this.http.get<{content: Equipamiento[]}>(this.apiUrl).pipe(
      map(response => {
        const transformed = response.content.map(item => ({
          inventario: item.inventario,
          equipo: item.nombre,
          dcp: item.ageDpc.toString(),
          agencia: item.ageId.toString(),
          empresa: 'Nombre de la Empresa',
          usuario: 'Nombre del Usuario',
          modelo: item.modelo
        }));
        console.log('Datos:', transformed); // Log transformed data
        return transformed;
      })
    );
  }
}
