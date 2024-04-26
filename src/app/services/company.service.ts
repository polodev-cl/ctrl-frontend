import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';

export interface Company {
  id: number;
  razonSocial: string;
  nombreCorto: string;
}

const BASE_URL = 'https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _companiesSelector: ReplaySubject<Partial<Company>[]> = new ReplaySubject<Partial<Company>[]>(1);

  constructor(private http: HttpClient) {}

  get companiesSelector() {
    return this._companiesSelector.asObservable();
  }

  getCompaniesSelector(): Observable<Partial<Company>[]> {
    return this.http
      .get<any>(BASE_URL + '/selector')
      .pipe(tap((companies) => this._companiesSelector.next(companies)));
  }

  getCompanies = (): Observable<any> => this.http.get<any>(BASE_URL);

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/:id`);
  }
}
