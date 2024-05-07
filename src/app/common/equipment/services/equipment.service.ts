import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'http://localhost:3000/api/equipment';

  constructor(private http: HttpClient) {}

  getEquipmentByRut(rut: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?rut=${rut}`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipmentByDPC(agenciaDpc: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/mini?agenciaDpc=${agenciaDpc}`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipment(query: { agenciaDpc: number }) {
    const queryParams = new HttpParams({ fromObject: query || {} });
    return this.http
      .get<any[]>(`${this.apiUrl}`, {params : queryParams} )
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipmentByInventory(inventoryNumber: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?inventario=${inventoryNumber}`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  createEquipment(equipmentData: any): Observable<any> {
    return this.http.post(this.apiUrl, equipmentData);
  }

  updateEquipment(equipmentId: number, equipmentData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${equipmentId}`, equipmentData)
      .pipe(tap(data => console.log('Updated equipment:', data)));
  }

  getEquipmentHistory(equipmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${equipmentId}/history`);
  }

  getEquipmentById(equipmentId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${equipmentId}`)
      .pipe(tap(data => console.log('Equipment data:', data)));
  }
}
