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
export class SoService {

  private datosEquipos: EquipmentType[] = [
    {
      type: 'PC',
      soOptions: [
        { so: 'Windows', versiones: [ 'Windows 10', 'Windows 11' ] },
        { so: 'Linux', versiones: [ 'Ubuntu 20.04', 'Fedora 34' ] },
      ]
    },
    {
      type: 'Impresora',
      soOptions: []
    },
    {
      type: 'Anexos',
      soOptions: []
    },
    {
      type: 'Escaner',
      soOptions: []
    },
    {
      type: 'LBM',
      soOptions: []
    },
    {
      type: 'Monitor',
      soOptions: []
    },
    {
      type: 'Notebook',
      soOptions: [
        { so: 'Windows', versiones: [ 'Windows 10', 'Windows 11' ] },
        { so: 'MacOS', versiones: [ 'Mojave', 'Catalina', 'Big Sur' ] },
        { so: 'Linux', versiones: [ 'Ubuntu 20.04', 'Fedora 34' ] }
      ]
    },
    {
      type: 'Pistola',
      soOptions: []
    },
    {
      type: 'Print Server',
      soOptions: [
        { so: 'Linux', versiones: [ 'Ubuntu Server 20.04', 'Debian Server 10' ] }
      ]
    },
    {
      type: 'TBK',
      soOptions: []
    }
  ];

  getSODataByType(type: string): Observable<SOVersion[]> {
    const equipmentType = this.datosEquipos.find(e => e.type === type);
    return of(equipmentType ? equipmentType.soOptions : []);
  }
}
