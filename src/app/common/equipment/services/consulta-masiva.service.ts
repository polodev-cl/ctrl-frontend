// src/app/services/consulta-masiva.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    params = params.append('companyId', companyId).append('agencyId', agencyId);

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

  obtenerEquipamientoCompleto(): Observable<any[]> {
    return this.http.get<Equipamiento[]>(this.apiUrl).pipe(
      map((data) =>
        data.map(
          ({
            id,
            usuarioIdCreacion,
            usuarioIdModificacion,
            fechaModificacion,
            ...rest
          }) => {
            return {
              Empresa: 'Nombre Empresa',
              'Rut Usuario': rest.rut || '-',
              'Agencia Nombre': rest.ageId?.toString() || 'Sin Agencia',
              Nemonico: rest.agenciaNemonico || '-',
              DPC: rest.agenciaDpc?.toString() || '-',
              caja: rest.uso || '-',
              Ubicacion: rest.ubicacion || '-',
              Equipo: rest.nombre || '-',
              Marca: rest.marca || '-',
              Modelo: rest.modelo || '-',
              'Sistema Operativo': rest.sistemaOperativo || '-',
              MAC: rest.mac || '-',
              'Nombre de Maquina': rest.tipo || '-',
              Procesador: rest.procesador || '-',
              RAM: rest.ramGb ? `${rest.ramGb} GB` : '-',
              'SSD/HDD': rest.disco || '-',
              IP: rest.ip || '-',
              'DDLL TBK': rest.ddllTbk || '-',
              'Numero serie': rest.serie || '-',
              Estado: rest.estado?.toString() || '-',
              'Encargado Agencia': rest.encargadoAgencia || '-',
              'Orden de compra numero': rest.ordenCompra || '-',
              Fechas: this.formatDate(rest.fechaIngreso),
            };
          }
        )
      )
    );
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2);
    const months = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    let month = months[date.getMonth()];
    return `${day}-${month}`; // Formato DD-mmm-YYYY (e.g., "11-feb-2024")
  }
}
