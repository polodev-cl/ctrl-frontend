export interface User {
  id: number;
  rut: string;
  activo: boolean;
  email: string;
  nombres: string;
  apellidos: string;
  rolId: number;
  empresaId: number;
  cognitoId?: string;
  temporaryPassword?: string;
}
