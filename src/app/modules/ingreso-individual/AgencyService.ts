import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
interface Option {
  value: string;
  label: string;
}

interface Agency {
  id: string;
  name: string;
  dpcs: Option[];
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
  private apiUrl = 'https://c7rm6ixvk5y6wldk52t5vh4uo40bjzcx.lambda-url.us-east-1.on.aws/';

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.apiUrl}`);
  }

  getAgenciasPorEmpresa(idEmpresa: string): Observable<Agency[]> {
    return this.getEmpresas().pipe(
      map(empresas => empresas.find(empresa => empresa.id === idEmpresa)?.agencias || [])
    );
  }
}