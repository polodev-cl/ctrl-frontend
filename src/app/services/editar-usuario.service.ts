import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from "../../environments/environment";

export interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  rut: string;
  correo: string;
  perfil: string;
}


@Injectable({ providedIn: 'root' })
export class EditarUsuarioService {
  private baseUrl: string = environment + '/api/user';

  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => data.map(item => ({
        id: item.id,
        usuario: item.email.split('@')[0],
        nombre: `${ item.nombres } ${ item.apellidos }`,
        rut: `${ item.rut }`,
        correo: item.email,
        perfil: item.rolId.toString()
      })))
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${ this.baseUrl }/${ id }`);
  }
}
