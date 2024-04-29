import { ICompany } from "@modules/company/domain/interface/company.interface";

export class CompanyQueryDto implements Partial<ICompany> {
  id?: number;
  rut?: string;
  razonSocial?: string;
  nombreCorto?: string;
  giro?: string;
  comuna?: string;
  prestador?: boolean;
  activo?: boolean;
}
