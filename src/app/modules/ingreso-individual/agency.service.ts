import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Agency {
  id: number;
  nombre: string;
  nemonico: string;
  dpc: number;
  empId: number;
}

const BASE_URL = 'http://localhost:3000/api/agency';

@Injectable({ providedIn: 'root' })
export class AgencyService {

  constructor(private http: HttpClient) {
  }

  getAgenciesSelectorByCompanyId(companyId: number): Observable<Partial<Agency>[]> {
    const httpParams = new HttpParams().append('empId', companyId);
    return this.http.get<Partial<Agency>[]>(`${ BASE_URL }/selector`, { params: httpParams });
  }

  getAgenciesByCompanyId(companyId: number): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${ BASE_URL }`).pipe(
      map(agencies => agencies.filter(agency => agency.empId === companyId))
    );
  }
}
