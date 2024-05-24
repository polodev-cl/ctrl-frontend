import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as xlsx from 'xlsx';
import { CreateMassiveDto } from "@modules/Custom/modal-carga-masiva/domain/dto/create-massive.dto";
import { IUpload } from "@modules/Custom/modal-carga-masiva/domain/interfaces/upload.interface";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private baseUrl: string = environment + '/api/equipment/upload';

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File): Promise<IUpload> {
    return new Promise((resolve, reject) => {
      console.log(file);
      // decode the file
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = xlsx.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelValue = xlsx.utils.sheet_to_json(sheet);

        const createMassiveDto = excelValue.map(CreateMassiveDto.fromExcelRow);
        this.http.post<IUpload>(this.baseUrl, createMassiveDto).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }

  uploadFileOld(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}
