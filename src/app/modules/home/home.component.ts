import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CognitoService } from '../../common/auth/cognito-service.service';
import { CompanyService } from '../../services/company.service';
import { ModalCargaMasivaComponent } from '../Custom/modal-carga-masiva/modal-carga-masiva.component';
import { ModalConsultaMasivaComponent } from '../Custom/modal-consulta-masiva/modal-consulta-masiva.component';
import { ModalDuplicadoComponent } from '../Custom/modal-duplicado/modal-duplicado.component';
import { ModalExitosoComponent } from '../Custom/modal-exitoso/modal-exitoso.component';
import { ModalGestionUsuarioComponent } from '../Custom/modal-gestion-usuario/modal-gestion-usuario.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { UserService } from '@app/common/user/services/user.service';
import { RoleEnum } from '@app/common/auth/enums/role.enum';
import { ModalAdvertenciaComponent } from '../Custom/modal-advertencia/modal-advertencia.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    ModalConsultaMasivaComponent,
    ModalGestionUsuarioComponent,
    ModalCargaMasivaComponent,
    NgIf,
    ModalDuplicadoComponent,
    ModalExitosoComponent,
    DividerModule,
    RouterLink,
    ButtonModule,
    NgForOf,
    NavbarComponent,
    ModalAdvertenciaComponent,
  ],
})
export class HomeComponent implements OnInit {
  breadcrumbs = [{ text: 'Home', link: '/home' }];
  RoleEnum = RoleEnum;

  empresa: any = null;
  mostrarModalAdvertencia: boolean = false;
  mensajeModalAdvertencia: string = 'Hubo un error en su solicitud';
  tituloModalAdvertencia: string = 'Error';
  mostrarModalConsultaMasiva: boolean = false;
  mostrarModalGestionUsuario: boolean = false;
  mostrarModalCargaMasiva: boolean = false;
  mostrarModalDuplicados: boolean = false;
  mostrarModalExito: boolean = false;
  tituloModalExito: string = '';
  mensajeModalExito: string = '';
  rol!: RoleEnum;
  erroresDuplicados: string[] = [];
  constructor(
    private companyService: CompanyService,
    private cognitoService: CognitoService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.rol = this.obtenerRolUsuario();
  }

  obtenerRolUsuario(): RoleEnum {
    return this.userService.getUserRole(); 
  }

  cerrarSesion() {
    this.cognitoService.signOut();
  }

  abrirModalDuplicado(errores: string[]): void {
    this.erroresDuplicados = errores; 
    this.mostrarModalCargaMasiva = false;
    this.mostrarModalDuplicados = true;
  }

  cerrarModalDuplicados(): void {
    this.mostrarModalDuplicados = false;
  }

  // consulta masiva
  abrirModalConsultaMasiva(): void {
    this.mostrarModalConsultaMasiva = true;
  }

  cerrarModalConsultaMasiva(): void {
    this.mostrarModalConsultaMasiva = false;
  }

  abrirModalGestionUsuario(): void {
    this.mostrarModalGestionUsuario = true;
  }

  cerrarModalGestionUsuario(): void {
    this.mostrarModalGestionUsuario = false;
  }

  // carga masiva
  abrirModalCargaMasiva(): void {
    this.mostrarModalCargaMasiva = true;
  }

  cerrarModalCargaMasiva(): void {
    this.mostrarModalCargaMasiva = false;
  }

  //advertencia
  cerrarModalAdvertencia(): void {
    this.mostrarModalAdvertencia = false;
  }
  abrirModalAdvertencia(mensaje: string): void {
    this.mostrarModalCargaMasiva = false;
    this.tituloModalAdvertencia = 'Error al carga masiva';
    this.mensajeModalAdvertencia = mensaje;
    this.mostrarModalAdvertencia = true;
  }

  manejarReemplazo(): void {
    this.tituloModalExito = 'Equipos Reemplazados';
    this.mensajeModalExito = 'Los equipos fueron reemplazados con exito.';

    this.mostrarModalDuplicados = false;
    this.mostrarModalExito = true;
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  finalizarCargaMasivaConExito(): void {
    this.tituloModalExito = 'Carga Masiva';
    this.mensajeModalExito = 'Ingreso masivo realizado con exito.';

    this.mostrarModalCargaMasiva = false;
    this.mostrarModalExito = true;
  }
}
