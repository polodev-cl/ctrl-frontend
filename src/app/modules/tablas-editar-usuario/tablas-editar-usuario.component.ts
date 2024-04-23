import { NgIf } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { EditarUsuarioService } from '../../services/editar-usuario.service';
import { ModalEditarComponent } from "../Custom/modal-editar/modal-editar.component";
import { ModalEliminarComponent } from "../Custom/modal-eliminar/modal-eliminar.component";
import { ModalExitosoComponent } from "../Custom/modal-exitoso/modal-exitoso.component";

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
  styleUrls: [ './tablas-editar-usuario.component.css' ],
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
    MatCell
  ]
})
export class TablasEditarUsuarioComponent implements AfterViewInit {
  usuarioAEliminar: Usuario | null = null;

  displayedColumns: string[] = [
    'usuario',
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

  constructor(private usuarioService: EditarUsuarioService) {
  }

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
      }
    });
  }

  editarUsuario(user: Usuario) {
    console.log('Editando usuario:', user);
    this.cerrarModalEditar();
  }

  //editar
  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
    this.mensajeModalEditar = 'Juan Pérez';
  }

  onEditarUsuarioExitoso(): void {
    this.cerrarModalEditar();
    this.tituloModalExito = 'Editar Usuario';
    this.mensajeModalExito = 'El usuario JPerez ha sido actualizado con éxito.';
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
    if ( this.usuarioAEliminar ) {
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
    if ( this.usuarioAEliminar ) {
      this.tituloModalExito = 'Eliminar Usuario';
      this.mensajeModalExito = `Usuario ${ this.usuarioAEliminar.nombre } ha sido eliminado con éxito.`;
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

      }
    });
  }


  recargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);

      }
    });
  }


}
