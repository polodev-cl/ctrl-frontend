import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl =
    'https://44n9fvhnl0.execute-api.us-east-1.amazonaws.com/api/equipment';

  constructor(private http: HttpClient) {}

  getEquipmentByRut(rut: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?rut=${rut}`).pipe(
      tap(data => console.log('Data from API:', data))
    );
  }

  getEquipmentByDPC(agenciaDpc: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?agenciaDpc=${agenciaDpc}`).pipe(
      tap(data => console.log('Data from API:', data))
    );
  }

  getEquipmentByInventory(inventoryNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?inventario=${inventoryNumber}`).pipe(
      tap(data => console.log('Data from API:', data))
    );
}
}
