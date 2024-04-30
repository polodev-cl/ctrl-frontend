export interface Equipamiento {
  id: number;
  fechaCreacion: string;
  fechaModificacion: string;
  estado: number;
  fechaIngreso: string;
  ordenCompra: string;
  rut: string;
  ageId: number;
  agenciaNemonico: string;
  agenciaDpc: number;
  inventario: number;
  tipo: string;
  sistemaOperativo: string;
  sistemaOperativoVersion: string;
  uso: string;
  marca: string;
  modelo: string;
  mac: string;
  ip: string;
  nombre: string;
  procesador: string;
  ramGb: number;
  disco: string;
  ddllTbk: string;
  serie: string;
  encargadoAgencia: string;
  ubicacion: string;
  garantiaMeses: number;
  usuarioIdCreacion: string;
  usuarioIdModificacion: string;
  fechaEliminacion?: any;
  agencia: any;
  usuarioCreacion: any;
}

export interface HistorialEquipment {
  id: number;
  equipoId: number;
  descripcion: string;
  fechaCreacion: string;
  usuario: {
    id: number;
    nombres: string;
    rut: string;
  };
}