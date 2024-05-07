import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { EditarUsuarioService } from '../../services/editar-usuario.service';
import { ModalEditarComponent } from '../Custom/modal-editar/modal-editar.component';
import { ModalEliminarComponent } from '../Custom/modal-eliminar/modal-eliminar.component';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';

interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  rut: string;
  correo: string;
  perfil: string;
}

@Component({
  selector: 'app-tablas-editar-usuario',
  templateUrl: './tablas-editar-usuario.component.html',
  styleUrls: ['./tablas-editar-usuario.component.css'],
  standalone: true,
  imports: [
    ModalEliminarComponent,
    ModalExitosoComponent,
    ModalEditarComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    NgIf,
    MatPaginator,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCell,
    MatTooltip,
    CommonModule
  ],
})
export class TablasEditarUsuarioComponent implements AfterViewInit {
  usuarioAEliminar: Usuario | null = null;

  displayedColumns: string[] = [
    'nombre',
    'rut',
    'correo',
    'perfil',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  mensajeModalEditar: string = '';
  mostrarModalExito: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalEliminar: boolean = false;
  rutInitial: string = '';
  emailInitial: string = '';
  perfilInitial: string = '';
  idUsuario!: number ;
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = '';
  tituloModalAdvertencia: string = 'Error al actualizar el Usuario';
  constructor(private usuarioService: EditarUsuarioService) {}

  ngAfterViewInit() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        console.log('Usuarios obtenidos:', usuarios);
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(user: Usuario) {
    console.log('Editando usuario:', user);
    this.mensajeModalEditar = `Editando a ${user.usuario}`;
    this.emailInitial = user.correo;
    this.rutInitial = user.rut;
    this.perfilInitial = user.perfil;
    console.log("id de user.id", user.id)
    this.idUsuario = user.id;
    console.log("id usuario desde tabla:",this.idUsuario)
    this.abrirModalEditar();
  }

  //editar
  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
  }

  onEditarUsuarioExitoso(): void {
    this.cerrarModalEditar();
    this.tituloModalExito = 'Editar Usuario';
    this.mensajeModalExito = 'El usuario ha sido actualizado con éxito.';
    this.mostrarModalExito = true;
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
  }

  abrirModalEliminar(user: Usuario): void {
    this.usuarioAEliminar = user;
    this.mostrarModalEliminar = true;
  }

  confirmarEliminacion(): void {
    if (this.usuarioAEliminar) {
      this.eliminarUsuario(this.usuarioAEliminar);
    } else {
      console.error('Error: No hay un usuario especificado para eliminar.');
    }
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioAEliminar = null;
  }

  abrirModalExito(): void {
    if (this.usuarioAEliminar) {
      this.tituloModalExito = 'Eliminar Usuario';
      this.mensajeModalExito = `Usuario ${this.usuarioAEliminar.nombre} ha sido eliminado con éxito.`;
      this.mostrarModalExito = true;
      this.mostrarModalEliminar = false;
      this.usuarioAEliminar = null;
    } else {
      console.error('No hay un usuario especificado para eliminar.');
    }
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  getPerfilDescripcion(perfil: String): string {
    switch (perfil) {
      case '1':
        return 'Administrador';
      case '2':
        return 'Ingreso';
      case '3':
        return 'Consulta';
      default:
        return 'Desconocido';
    }
  }

  eliminarUsuario(user: Usuario) {
    console.log('Intentando eliminar usuario:', user);

    this.usuarioService.eliminarUsuario(user.id).subscribe({
      next: (response) => {
        console.log('Usuario eliminado con éxito', response);
        this.abrirModalExito();
        this.recargarUsuarios();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      },
    });
  }

  recargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      },
    });
  }
}
