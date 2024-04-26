import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'https://4d49-181-226-165-253.ngrok-free.app/api/equipment';

  constructor(private http: HttpClient) {
  }

  getEquipmentByRut(rut: string): Observable<any[]> {
    return this.http.get<any[]>(`${ this.apiUrl }?rut=${ rut }`).pipe(
      tap(data => console.log('Data from API:', data))
    );
  }

  getEquipmentByDPC(agenciaDpc: number): Observable<any[]> {
    return this.http.get<any[]>(`${ this.apiUrl }/mini?agenciaDpc=${ agenciaDpc }`).pipe(
      tap(data => console.log('Data from API:', data))
    );
  }

  getEquipmentByInventory(inventoryNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${ this.apiUrl }?inventario=${ inventoryNumber }`).pipe(
      tap(data => console.log('Data from API:', data))
    );
  }

  createEquipment(equipmentData: any): Observable<any> {
    return this.http.post(this.apiUrl, equipmentData);
  }
}
