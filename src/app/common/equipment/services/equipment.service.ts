import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private baseUrl: string = environment + '/api/equipment';

  constructor(private http: HttpClient) {
  }

  getEquipmentByRut(rut: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${ this.baseUrl }?rut=${ rut }`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipmentByDPC(agenciaDpc: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${ this.baseUrl }/mini?agenciaDpc=${ agenciaDpc }`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipment(query: { agenciaDpc: number }) {
    const queryParams = new HttpParams({ fromObject: query || {} });
    return this.http
      .get<any[]>(`${ this.baseUrl }`, { params: queryParams })
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  getEquipmentByInventory(inventoryNumber: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${ this.baseUrl }?inventario=${ inventoryNumber }`)
      .pipe(tap((data) => console.log('Data from API:', data)));
  }

  createEquipment(equipmentData: any): Observable<any> {
    return this.http.post(this.baseUrl, equipmentData);
  }

  updateEquipment(equipmentId: number, equipmentData: any): Observable<any> {
    return this.http.patch(`${ this.baseUrl }/${ equipmentId }`, equipmentData)
      .pipe(tap(data => console.log('Updated equipment:', data)));
  }

  getEquipmentHistory(equipmentId: number): Observable<any> {
    return this.http.get(`${ this.baseUrl }/${ equipmentId }/history`);
  }

  getEquipmentById(equipmentId: number): Observable<any> {
    return this.http
      .get<any>(`${ this.baseUrl }/${ equipmentId }`)
      .pipe(tap(data => console.log('Equipment data:', data)));
  }
}
