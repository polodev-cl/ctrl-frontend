import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
    private baseUrl: string = ' https://3b8lqih9ze.execute-api.us-east-1.amazonaws.com/stage/api/equipment/upload';
  
    constructor(private http: HttpClient) {}
  
    uploadFile(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      const req = new HttpRequest('POST', this.baseUrl, formData, {
        reportProgress: true,
        responseType: 'json',
      });
  
      return this.http.request(req);
    }
  }