// src/app/services/consulta-masiva.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Equipamiento {
  id: number;
  fechaCreacion: string;
  fechaModificacion: string;
  estado: number;
  fechaIngreso: string;
  ordenCompra: string;
  rut: string;
  ageId: number;
  agenciaNemonico: string;
  agenciaDpc: number;
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
  usuarioIdCreacion: string;
  usuarioIdModificacion: string;
  fechaEliminacion?: any;
}

export interface Consulta {
  inventario: number;
  equipo: string;
  dcp: string;
  agencia: string;
  empresa: string;
  usuario: string;
  modelo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConsultaMasivaService {
  private apiUrl = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/equipment'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {
  }



  obtenerEquipamientoFiltrado(tipo: string, sistemaOperativo: string, sistemaOperativoVersion: string, uso: string): Observable<Consulta[]> {
    const params = {
      tipo,
      sistemaOperativo,
      sistemaOperativoVersion,
      uso
    };
    return this.http.get<Equipamiento[]>(this.apiUrl, { params }).pipe(
      map((data) =>
        data.map((item) => ({
          inventario: item.inventario,
          equipo: item.nombre,
          dcp: item.agenciaDpc ? item.agenciaDpc.toString() : '-',
          agencia: item.ageId ? item.ageId.toString() : '-',
          empresa: 'Nombre de la Empresa',
          usuario: 'Nombre del Usuario',
          modelo: item.modelo,
        }))
      )
    );
  }

  obtenerEquipamientoCompleto(): Observable<any[]> {
    return this.http.get<Equipamiento[]>(this.apiUrl).pipe(
      map(data => data.map(({
                              id, usuarioIdCreacion, usuarioIdModificacion, fechaModificacion, ...rest
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
          RAM: rest.ramGb ? `${ rest.ramGb } GB` : '-',
          'SSD/HDD': rest.disco || '-',
          IP: rest.ip || '-',
          'DDLL TBK': rest.ddllTbk || '-',
          'Numero serie': rest.serie || '-',
          Estado: rest.estado?.toString() || '-',
          'Encargado Agencia': rest.encargadoAgencia || '-',
          'Orden de compra numero': rest.ordenCompra || '-',
          Fechas: this.formatDate(rest.fechaIngreso)
        };
      }))
    );
  }


  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2);
    const months = [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ];
    let month = months[date.getMonth()]; // Usa el array para obtener el nombre del mes
    return `${ day }-${ month }`; // Formato DD-mmm-YYYY (e.g., "11-feb-2024")
  }

}
