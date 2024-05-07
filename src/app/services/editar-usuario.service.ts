import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
  private apiUrl = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/user';

  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        id: item.id,
        usuario: item.email.split('@')[0], 
        nombre: `${ item.nombres } ${ item.apellidos }`,
        rut: `${item.rut}`,
        correo: item.email,
        perfil: item.rolId.toString() 
      })))
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${ this.apiUrl }/${ id }`);
  }
}
