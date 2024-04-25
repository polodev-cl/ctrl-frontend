import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Company {
  id: number;
  razonSocial: string;
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'https://44n9fvhnl0.execute-api.us-east-1.amazonaws.com/api/company';

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${ this.baseUrl }`);
  }
}
