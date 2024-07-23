import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private baseUrl: string = environment.apiBaseUrl + '/api/equipment';

  constructor(private http: HttpClient) {
  }

  getEquipmentByRut(rut: string): Observable<any[]> {
    return this.http .get<any[]>(`${ this.baseUrl }?rut=${ rut }`);
  }

  getEquipmentByDPC(agenciaDpc: number): Observable<any[]> {
    return this.http .get<any[]>(`${ this.baseUrl }/mini?agenciaDpc=${ agenciaDpc }`);
  }

  getEquipment(query: { agenciaDpc: number }) {
    const queryParams = new HttpParams({ fromObject: query || {} });
    return this.http .get<any[]>(`${ this.baseUrl }`, { params: queryParams });
  }

  getEquipmentByInventory(inventoryNumber: number): Observable<any[]> {
    return this.http .get<any[]>(`${ this.baseUrl }?inventario=${ inventoryNumber }`);
  }

  createEquipment(equipmentData: any): Observable<any> {
    return this.http.post(this.baseUrl, equipmentData);
  }

  updateEquipment(equipmentId: number, equipmentData: any): Observable<any> {
    return this.http.patch(`${ this.baseUrl }/${ equipmentId }`, equipmentData);
  }

  getEquipmentHistory(equipmentId: number): Observable<any> {
    return this.http.get(`${ this.baseUrl }/${ equipmentId }/history`);
  }

  getEquipmentById(equipmentId: number): Observable<any> {
    return this.http .get<any>(`${ this.baseUrl }/${ equipmentId }`);
  }
}
