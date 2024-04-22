import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface EquipmentType {
  type: string;
  soOptions: SOVersion[];
}

export interface SOVersion {
  so: string;
  versiones: string[];
}
@Injectable({
  providedIn: 'root'
})
export class SOService {
  
  // Supongamos que tienes una lista de tipos de equipos con sistemas operativos permitidos.
  private datosEquipos: EquipmentType[] = [
    { 
      type: 'PC', 
      soOptions: [
        { so: 'Windows', versiones: ['Windows 10', 'Windows 11'] },
        { so: 'Linux', versiones: ['Ubuntu 20.04', 'Fedora 34'] },
        // Más opciones...
      ]
    },
    { 
      type: 'Impresora', 
      soOptions: [] // Las impresoras pueden no tener sistemas operativos aplicables.
    },
    // Más tipos de equipos...
  ];
  getSODataByType(type: string): Observable<SOVersion[]> {
    const equipmentType = this.datosEquipos.find(e => e.type === type);
    return of(equipmentType ? equipmentType.soOptions : []);
  }
}
