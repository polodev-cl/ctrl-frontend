import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CompanyQueryDto } from "@modules/company/domain/dto/company-query.dto";
import { CreateCompanyDto } from "@modules/company/domain/dto/create-company.dto";
import { UpdateCompanyDto } from "@modules/company/domain/dto/update-company.dto";
import { environment } from "../../environments/environment";

export interface Company {
  id: number;
  razonSocial: string;
  nombreCorto: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl: string = environment.apiBaseUrl + '/api/company';

  constructor(private http: HttpClient) {
  }

  private _companiesSelector: ReplaySubject<Partial<Company>[]> = new ReplaySubject<Partial<Company>[]>(1);

  get companiesSelector() {
    return this._companiesSelector.asObservable();
  }

  getCompaniesSelector(): Observable<Partial<Company>[]> {
    return this.http
      .get<any>(this.baseUrl + '/selector')
      .pipe(tap((companies) => this._companiesSelector.next(companies)));
  }

  getCompanies = (query?: CompanyQueryDto): Observable<any> => {
    const queryParams: HttpParams = new HttpParams({ fromObject: query || {} as any });

    return this.http.get<any>(this.baseUrl, { params: queryParams });
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${ this.baseUrl }/${ id }`);
  }

  createCompany(companyData: CreateCompanyDto): Observable<any> {
    return this.http.post(this.baseUrl, companyData);
  }

  updateCompany(id: number, companyData: UpdateCompanyDto): Observable<any> {
    return this.http.patch(`${ this.baseUrl }/${ id }`, companyData);
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${ this.baseUrl }/${ companyId }`);
  }
}

