import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'https://nqyw4kymuud65aoxwslnl3jqhe0unvrn.lambda-url.us-east-1.on.aws/api/company';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
