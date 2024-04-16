import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Usuario {
  usuario: string;
  nombre: string;
  rut: string;
  correo: string;
  perfil: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {
  private apiUrl = 'http://127.0.0.1:3000/api/user'; // Ajusta esto a la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<{content: any[], statusCode: number, path: string, method: string, timestamp: string}>(this.apiUrl).pipe(
      map(response => response.content.map(item => ({
        usuario: item.email.split('@')[0],
        nombre: `${item.nombres} ${item.apellidos}`,
        rut: '', // Suponer que no tenemos el RUT, lo dejamos vacío
        correo: item.email,
        perfil: `${item.rolId}` // Asociar rolId a un perfil
      })))
    );
  }
}
