import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Consulta } from '../interfaces/consulta-equipment.interface';
import { Equipamiento } from '../interfaces/equipamiento.interface';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ConsultaMasivaService {
  private baseUrl: string = environment.apiBaseUrl + '/api/equipment';

  constructor(private http: HttpClient) {
  }

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

    return this.http.get<Equipamiento[]>(this.baseUrl, { params }).pipe(
      map((data) =>
        data.map((item) => {
          let nombres = undefined;

          if (item.usuarioCreacion?.nombres && item.usuarioCreacion?.apellidos)
            nombres = item.usuarioCreacion?.nombres + ' ' + item.usuarioCreacion.apellidos;

          return {
            id: item.id,
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
      .get<any[]>(this.baseUrl, { params })
  }
}
