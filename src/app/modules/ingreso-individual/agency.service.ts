import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAgency } from "@modules/agency/domain/interface/agency.interface";

export interface Agency {
  id: number;
  nombre: string;
  nemonico: string;
  dpc: number;
  empId: number;
}

const BASE_URL = ' https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/agency';

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

  getAgencyById(agencyId: number): Observable<IAgency> {
    return this.http.get<IAgency>(`${ BASE_URL }/${ agencyId }`);
  }

  getAgencies(query: Partial<IAgency>): Observable<IAgency[]> {
    return this.http.get<IAgency[]>(`${ BASE_URL }`, { params: query as any });
  }

  createAgency(agencyData: IAgency): Observable<any> {
    return this.http.post(BASE_URL, agencyData);
  }

  updateAgency(id: number, agencyData: IAgency): Observable<any> {
    return this.http.patch(`${ BASE_URL }/${ id }`, agencyData);
  }

  deleteAgency(agencyId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${agencyId}`);
  }
}
