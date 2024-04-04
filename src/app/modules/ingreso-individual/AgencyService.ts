import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Option {
  value: string;
  label: string;
}

interface Agency {
  id: string;
  name: string;
  empresas: Option[];
  dcps: Option[];
  nemonicos: Option[];
}

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private agencies: Agency[] = [
    {
      id: '1',
      name: 'Agencia 1',
      empresas: [{ value: 'Empresa1', label: 'Empresa 1' }],
      dcps: [{ value: 'DCP1', label: 'DCP 1' }],
      nemonicos: [{ value: 'Nemónico1', label: 'Nemónico 1' }],
    },
    {
        id: '2',
        name: 'Agencia 2',
        empresas: [{ value: 'Empresa2', label: 'Empresa 2' }],
        dcps: [{ value: 'DCP2', label: 'DCP 2' }],
        nemonicos: [{ value: 'Nemónico2', label: 'Nemónico 2' }],
      },

  ];

  getAgencies(): Observable<Agency[]> {
    return of(this.agencies);
  }
}
