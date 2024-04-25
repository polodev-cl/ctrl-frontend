import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
export interface Company {
  id: number;
  razonSocial: string;
}

const BASE_URL = 'https://4d49-181-226-165-253.ngrok-free.app/api/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _companies: ReplaySubject<Company[]> = new ReplaySubject<Company[]>( 1 );

  constructor(private http: HttpClient) {}

  get companies() {
    return this._companies.asObservable();
  }

  getCompanies(): Observable<any> {
    return this.http
      .get<any>(BASE_URL)
      .pipe(tap((companies) => this._companies.next(companies)));
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/:id`);
  }
}
