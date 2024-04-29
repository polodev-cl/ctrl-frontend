export interface IAgency {
  id: number;
  activo: boolean;
  name: string;
  nemonico: string;
  dpc: number;
  empId: number;
  fechaCreacion: Date;
  empresa: IAgency;
}
