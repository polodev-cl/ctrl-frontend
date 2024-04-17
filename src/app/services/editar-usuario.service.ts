import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Usuario {
  id: number;
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
  private apiUrl = 'http://127.0.0.1:3000/api/user'; 

  constructor(private http: HttpClient) { }
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<{content: any[], statusCode: number, path: string, method: string, timestamp: string}>(this.apiUrl).pipe(
      map(response => {
        return response.content.map(item => ({
          id: item.id,  // Asegúrate de extraer el ID aquí
          usuario: item.email.split('@')[0],
          nombre: `${item.nombres} ${item.apellidos}`,
          rut: '', 
          correo: item.email,
          perfil: `${item.rolId}` 
        }));
      })
    );
  }
  

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
