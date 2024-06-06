import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface EquipmentType {
  type: string;
  soOptions: SOVersion[];
}

export interface SOVersion {
  so: string;
}

@Injectable({
  providedIn: 'root'
})
export class SoService {

  private datosEquipos: EquipmentType[] = [
    {
      type: 'PC',
      soOptions: [
        { so: 'Windows 10' },
        { so: 'Windows 10 Pro' },
        { so: 'Windows 11' },
        { so: 'Fedora 24' },
        { so: 'Fedora 14' },
        { so: 'Windows 8.1' },
        { so: 'Windows 7' },
        { so: 'Windows Server 2019' },
        { so: 'macOS 14.0' }
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
        { so: 'Windows 10' },
        { so: 'Windows 10 Pro' },
        { so: 'Windows 11' },
        { so: 'Fedora 24' },
        { so: 'Fedora 14' },
        { so: 'Windows 8.1' },
        { so: 'Windows 7' },
        { so: 'Windows Server 2019' },
        { so: 'macOS 14.0' }
      ]
    },
    {
      type: 'Pistola',
      soOptions: []
    },
    {
      type: 'Print Server',
      soOptions: []
    },
    {
      type: 'TBK',
      soOptions: []
    },
    {
      type: 'Pasaje Matico',
      soOptions: [
        { so: 'Windows 10' },
        { so: 'Windows 10 Pro' },
        { so: 'Windows 11' },
        { so: 'Fedora 24' },
        { so: 'Fedora 14' },
        { so: 'Windows 8.1' },
        { so: 'Windows 7' },
        { so: 'Windows Server 2019' },
        { so: 'macOS 14.0' }
      ]
    },
  ];

  getSODataByType(type: string): Observable<SOVersion[]> {
    const equipmentType = this.datosEquipos.find(e => e.type === type);
    return of(equipmentType ? equipmentType.soOptions : []);
  }
}
