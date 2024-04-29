export interface ICompany {
  id: number;
  rut: string;
  razonSocial: string;
  nombreCorto: string;
  giro: string;
  domicilio: string;
  comuna: string;
  sitioWeb?: string;
  observaciones?: string;
  prestador: boolean;
  activo: boolean;
}
