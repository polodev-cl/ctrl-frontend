import { ICompany } from "@modules/company/domain/interface/company.interface";

export interface IAgency {
  id: number;
  activo: boolean;
  nombre: string;
  nemonico: string;
  dpc: number;
  empId: number;
  fechaCreacion: Date;
  empresa: Partial<ICompany>;
}
