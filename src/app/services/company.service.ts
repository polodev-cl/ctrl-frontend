import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/company';

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${ this.baseUrl }`);
  }
}
