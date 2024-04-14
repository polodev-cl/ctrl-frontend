import { Component, OnInit} from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { CognitoService } from '../../cognito-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  

  breadcrumbs = [
    { text: 'Home', link: '/home' },
  ];

  empresa: any = null;

  constructor(private companyService: CompanyService, private cognitoService: CognitoService) { }
  async cerrarSesion() {
    await this.cognitoService.signOut();
    // Puedes realizar acciones adicionales después de cerrar sesión, como redirigir a la página de inicio de sesión
  }
  ngOnInit() {
    this.companyService.getCompanyById(1).subscribe({
      next: (data) => {
        this.empresa = data;
      },
      error: (error) => {
        console.error('Error al obtener datos de la empresa', error);
      }
    });
  }

  mostrarModalConsultaMasiva: boolean = false;
  mostrarModalGestionUsuario: boolean = false;
  mostrarModalCargaMasiva: boolean = false;
  mostrarModalDuplicados: boolean = false;
  mostrarModalExito: boolean = false;

  tituloModalExito: string = '';
  mensajeModalExito: string = '';

  abrirModalDuplicados(): void {
    this.mostrarModalDuplicados = true;
  }

  cerrarModalDuplicados(): void {
    this.mostrarModalDuplicados = false;
  }
  //consulta masiva
  abrirModalConsultaMasiva(): void {
    this.mostrarModalConsultaMasiva = true;
  }

  cerrarModalConsultaMasiva(): void {
    this.mostrarModalConsultaMasiva = false;
  }
//gestion usuario

  abrirModalGestionUsuario(): void {
    this.mostrarModalGestionUsuario = true;
  }

  cerrarModalGestionUsuario(): void {
    this.mostrarModalGestionUsuario = false;
  }

  //carga masiva
  abrirModalCargaMasiva(): void {
    this.mostrarModalCargaMasiva = true;
  }

  cerrarModalCargaMasiva(): void {
    this.mostrarModalCargaMasiva = false;
  }

  manejarReemplazo(): void {
    // Antes de mostrar el modal exitoso, asigna los valores deseados a las propiedades
    this.tituloModalExito = 'Equipos Reemplazados';
    this.mensajeModalExito = 'Los equipos fueron reemplazados con exito.';

    this.mostrarModalDuplicados = false; // Cerrar modal de duplicados
    this.mostrarModalExito = true; // Abrir modal exitoso
  }

  cerrarModalExito(): void {
    this.mostrarModalExito = false;
  }

  finalizarCargaMasivaConExito(): void {
    // Asigna los valores al título y mensaje del modal exitoso
    this.tituloModalExito = 'Carga Masiva';
    this.mensajeModalExito = 'Ingreso masivo realizado con exito.';
  
    this.mostrarModalCargaMasiva = false; // Cierra el modal de carga masiva
    this.mostrarModalExito = true; // Abre el modal exitoso
  }




}