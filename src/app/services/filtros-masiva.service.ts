import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define las interfaces aquí
interface EquipmentType {
  name: string;
  operatingSystems: OperatingSystem[];
}

interface OperatingSystem {
  name: string;
  versions: string[];
}

export interface OptionData {
  equipmentTypes: EquipmentType[];
  systems: OperatingSystem[];
  usages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FiltrosMasivaService {

  constructor(private http: HttpClient) { }

  getOptionData(): Observable<OptionData> {
    return this.http.get<OptionData>('/assets/options.json');
  }
}
