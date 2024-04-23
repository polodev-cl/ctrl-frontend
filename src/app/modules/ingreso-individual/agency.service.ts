import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Company {
  id: number;
  razonSocial: string;
}

export interface Agency {
  id: number;
  nombre: string;
  nemonico: string;
  dpc: number;
  empId: number;
}

@Injectable({ providedIn: 'root', })
export class AgencyService {
  private companyApiUrl = 'https://44n9fvhnl0.execute-api.us-east-1.amazonaws.com/api/company';
  private agencyApiUrl = 'https://44n9fvhnl0.execute-api.us-east-1.amazonaws.com/api/agency';

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${ this.companyApiUrl }`);
  }

  getAgenciesByCompanyId(companyId: number): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${ this.agencyApiUrl }`).pipe(
      map(agencies => agencies.filter(agency => agency.empId === companyId))
    );
  }
}
