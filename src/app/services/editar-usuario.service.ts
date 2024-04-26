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
  private apiUrl = 'https://4d49-181-226-165-253.ngrok-free.app/api/user';

  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        id: item.id,
        usuario: item.email.split('@')[0],  // Extrayendo el nombre de usuario del email
        nombre: `${ item.nombres } ${ item.apellidos }`,  // Combinando nombres y apellidos
        rut: '', // No se proporciona un RUT en el objeto, por lo tanto, se deja vacío
        correo: item.email,
        perfil: item.rolId.toString()  // Convirtiendo el rolId a string si es necesario
      })))
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${ this.apiUrl }/${ id }`);
  }
}
