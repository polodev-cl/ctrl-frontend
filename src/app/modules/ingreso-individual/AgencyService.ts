import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Option {
  value: string;
  label: string;
}

interface Agency {
  id: string;
  name: string;
  dcps: Option[];
  nemonicos: Option[];
}

interface Empresa {
  id: string;
  name: string;
  agencias: Agency[];
}

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private empresas: Empresa[] = [
    {
      id: '1',
      name: 'Starken',
      agencias: [
        {
          id: '1',
          name: 'Concepción Centro',
          dcps: [{ value: 'DCPStarkenConcepcion', label: 'DCP Starken Concepción Centro' }],
          nemonicos: [{ value: 'NemonicoStarkenConcepcion', label: 'Nemónico Starken Concepción Centro' }],
        },
        {
          id: '2',
          name: 'Talcahuano',
          dcps: [{ value: 'DCPStarkenTalcahuano', label: 'DCP Starken Talcahuano' }],
          nemonicos: [{ value: 'NemonicoStarkenTalcahuano', label: 'Nemónico Starken Talcahuano' }],
        },
        // Puedes añadir más agencias de Starken si es necesario
      ],
    },
    {
      id: '2',
      name: 'Chilexpress',
      agencias: [
        {
          id: '3',
          name: 'Barros Arana',
          dcps: [{ value: 'DCPChilexpressBarrosArana', label: 'DCP Chilexpress Barros Arana' }],
          nemonicos: [{ value: 'NemonicoChilexpressBarrosArana', label: 'Nemónico Chilexpress Barros Arana' }],
        },
        {
          id: '4',
          name: 'Mall Plaza del Trébol',
          dcps: [{ value: 'DCPChilexpressPlazaTrebol', label: 'DCP Chilexpress Mall Plaza del Trébol' }],
          nemonicos: [{ value: 'NemonicoChilexpressPlazaTrebol', label: 'Nemónico Chilexpress Mall Plaza del Trébol' }],
        },
        // Puedes añadir más agencias de Chilexpress si es necesario
      ],
    },
    // Añade más empresas y sus agencias si es necesario
  ];
  

  getEmpresas(): Observable<Empresa[]> {
    return of(this.empresas);
  }

  getAgenciasPorEmpresa(idEmpresa: string): Observable<Agency[]> {
    const empresa = this.empresas.find((empresa) => empresa.id === idEmpresa);
    return of(empresa ? empresa.agencias : []);
  }
}
