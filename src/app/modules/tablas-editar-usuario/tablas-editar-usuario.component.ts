import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditarUsuarioService } from '../../services/editar-usuario.service';

interface Usuario {
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
})
export class TablasEditarUsuarioComponent implements AfterViewInit {
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

  constructor(private usuarioService: EditarUsuarioService) {}

  ngAfterViewInit() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
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
    // Lógica para editar el usuario
    console.log('Editando usuario:', user);
    this.cerrarModalEditar();
  }

  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  mensajeModalEditar: string = '';
  mostrarModalExito: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalEliminar: boolean = false; // Asegúrate de que esta propiedad exista

  //editar
  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
    this.mensajeModalEditar = 'Juan Pérez';
  }

  onEditarUsuarioExitoso(): void {
    this.cerrarModalEditar(); // Cierra el modal de editar

    // Configura y abre el modal de éxito
    this.tituloModalExito = 'Editar Usuario';
    this.mensajeModalExito = 'El usuario JPerez ha sido actualizado con éxito.';
    this.mostrarModalExito = true;
  }

  cerrarModalEditar(): void {
    // Solo cierra el modal de eliminar
    this.mostrarModalEditar = false;
  }

  //eliminar
  abrirModalEliminar(): void {
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  abrirModalExito(): void {
    this.tituloModalExito = 'Eliminar Usuario';
    this.mensajeModalExito = 'Usuario JPerez ha sido eliminado con éxito.';
    this.mostrarModalExito = true;

    this.mostrarModalEliminar = false;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  eliminarUsuario(user: Usuario) {
    console.log('Eliminando usuario:', user);

    this.cerrarModalEliminar();
  }
}
