// src/app/services/consulta-masiva.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Consulta } from '../interfaces/consulta-equipment.interface';
import { Equipamiento } from '../interfaces/equipamiento.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMasivaService {
  private apiUrl =
    'http://localhost:3000/api/equipment';

  constructor(private http: HttpClient) {}

  obtenerEquipamientoFiltrado(
    companyId: number,
    agencyId: number,
    tipo: string,
    sistemaOperativo: string,
    uso: string
  ): Observable<Consulta[]> {
    let params = new HttpParams();

    params = params.append('empresaId', companyId).append('agenciaId', agencyId);

    if (tipo) {
      params = params.append('tipo', tipo);
    }
    if (sistemaOperativo && sistemaOperativo !== 'N/A') {
      params = params.append('sistemaOperativo', sistemaOperativo);
    }
    if (uso) {
      params = params.append('uso', uso);
    }

    return this.http.get<Equipamiento[]>(this.apiUrl, { params }).pipe(
      map((data) =>
        data.map((item) => {
          let nombres = undefined;

          if (item.usuarioCreacion?.nombres && item.usuarioCreacion?.apellidos)
            nombres = item.usuarioCreacion?.nombres + ' ' + item.usuarioCreacion.apellidos;

          return {
            inventario: item.inventario,
            equipo: item.nombre,
            dcp: item.agenciaDpc?.toString() || '-',
            agencia: item.agencia?.nombre || '-',
            empresa: item.agencia?.empresa?.nombreCorto || '-',
            usuario: nombres || '-',
            modelo: item.modelo,
          }
        })
      )
    );
  }


  getMassiveQuery(
    companyId: number,
    agencyId: number,
    tipo: string,
    sistemaOperativo: string,
    uso: string
  ) {
    let params = new HttpParams();
  
    params = params.append('empresaId', companyId).append('agenciaId', agencyId);
  
    if (tipo) {
      params = params.append('tipo', tipo);
    }
    if (sistemaOperativo && sistemaOperativo !== 'N/A') {
      params = params.append('sistemaOperativo', sistemaOperativo);
    }
    if (uso) {
      params = params.append('uso', uso);
    }
  
    return this.http
      .get<any[]>(this.apiUrl, { params })
      .pipe(tap((data) => console.log('Data from API:', data)));
  }
  
}
