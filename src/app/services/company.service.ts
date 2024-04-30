import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CompanyQueryDto } from "@modules/company/domain/dto/company-query.dto";
import { CreateCompanyDto } from "@modules/company/domain/dto/create-company.dto";
import { UpdateCompanyDto } from "@modules/company/domain/dto/update-company.dto";

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
  constructor(private http: HttpClient) {
  }

  private _companiesSelector: ReplaySubject<Partial<Company>[]> = new ReplaySubject<Partial<Company>[]>(1);

  get companiesSelector() {
    return this._companiesSelector.asObservable();
  }

  getCompaniesSelector(): Observable<Partial<Company>[]> {
    return this.http
      .get<any>(BASE_URL + '/selector')
      .pipe(tap((companies) => this._companiesSelector.next(companies)));
  }

  getCompanies = (query?: CompanyQueryDto): Observable<any> => {
    const queryParams: HttpParams = new HttpParams({ fromObject: query || {} as any });

    return this.http.get<any>(BASE_URL, { params: queryParams });
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${ BASE_URL }/${ id }`);
  }

  createCompany(companyData: CreateCompanyDto): Observable<any> {
    return this.http.post(BASE_URL, companyData);
  }

  updateCompany(id: number, companyData: UpdateCompanyDto): Observable<any> {
    return this.http.patch(`${ BASE_URL }/${ id }`, companyData);
  }
}

