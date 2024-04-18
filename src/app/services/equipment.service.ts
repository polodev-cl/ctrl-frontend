import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'https://nqyw4kymuud65aoxwslnl3jqhe0unvrn.lambda-url.us-east-1.on.aws/api/equipment';

  constructor(private http: HttpClient) { }

  getEquipmentByRut(rut: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?rut=${rut}`).pipe(
      tap(data => console.log('Data from API:', data)),
      map(equipments => equipments[0] || null) // Suponiendo que la API devuelve un arreglo
    );
  }
}