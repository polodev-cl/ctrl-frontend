import { Company } from "@app/services/company.service";

export class CompanyQueryDto implements Partial<Company> {
  id?: number;
  rut?: string;
  razonSocial?: string;
  nombreCorto?: string;
  giro?: string;
  comuna?: string;
  prestador?: boolean;
  activo?: boolean;
}
