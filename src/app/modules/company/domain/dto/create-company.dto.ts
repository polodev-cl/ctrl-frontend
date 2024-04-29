import { ICompany } from "@modules/company/domain/interface/company.interface";

export class CreateCompanyDto implements Partial<ICompany> {
  rut!: string;
  razonSocial!: string;
  nombreCorto!: string;
  giro!: string;
  domicilio!: string;
  comuna!: string;
  sitioWeb?: string;
  observaciones?: string;
  prestador!: boolean;
}
