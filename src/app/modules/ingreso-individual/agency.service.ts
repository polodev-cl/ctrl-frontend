import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { environment } from "../../../environments/environment";

export interface Agency {
  id: number;
  nombre: string;
  nemonico: string;
  dpc: number;
  empId: number;
}

@Injectable({ providedIn: 'root' })
export class AgencyService {
  private baseUrl: string = environment.apiBaseUrl + '/api/agency';

  constructor(private http: HttpClient) {
  }

  getAgenciesSelectorByCompanyId(companyId: number): Observable<Partial<Agency>[]> {
    const httpParams = new HttpParams().append('empId', companyId);
    return this.http.get<Partial<Agency>[]>(`${ this.baseUrl }/selector`, { params: httpParams });
  }

  getAgenciesByCompanyId(companyId: number): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${ this.baseUrl }`).pipe(
      map(agencies => agencies.filter(agency => agency.empId === companyId))
    );
  }

  getAgencyById(agencyId: number): Observable<IAgency> {
    return this.http.get<IAgency>(`${ this.baseUrl }/${ agencyId }`);
  }

  getAgencies(query: Partial<IAgency>): Observable<IAgency[]> {
    return this.http.get<IAgency[]>(`${ this.baseUrl }`, { params: query as any });
  }

  createAgency(agencyData: IAgency): Observable<any> {
    return this.http.post(this.baseUrl, agencyData);
  }

  updateAgency(id: number, agencyData: IAgency): Observable<any> {
    return this.http.patch(`${ this.baseUrl }/${ id }`, agencyData);
  }

  deleteAgency(agencyId: number): Observable<any> {
    return this.http.delete(`${ this.baseUrl }/${ agencyId }`);
  }
}
