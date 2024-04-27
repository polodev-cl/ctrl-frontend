import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CompanyQueryDto } from "@modules/company/dto/company-query.dto";
import { cleanObjectFromUndefinedFields } from "@app/utils/utils";

export interface Company {
  id: number;
  razonSocial: string;
  nombreCorto: string;
}

const BASE_URL = 'http://localhost:3000/api/company';

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

  getCompanies = (query?: CompanyQueryDto): Observable<any> => {
    console.log('query', query)

    // Clean from query object all properties with null or undefined values
    const cleanQuery = cleanObjectFromUndefinedFields(query);

    const queryParams: HttpParams = new HttpParams({ fromObject: cleanQuery as any });

    return this.http.get<any>(BASE_URL, { params: queryParams });
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/:id`);
  }


  createCompany(companyData: any): Observable<any> {
    return this.http.post(BASE_URL, companyData);
  }
}

