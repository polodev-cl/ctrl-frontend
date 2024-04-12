import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { DataUsuarioRutComponent } from './modules/data-usuario-rut/data-usuario-rut.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { ConsultaIndividualComponent } from './modules/consulta-individual/consulta-individual.component';
import { ConsultaMasivaComponent } from './modules/consulta-masiva/consulta-masiva.component';
import { IngresoIndividualComponent } from './modules/ingreso-individual/ingreso-individual.component';
import { EditarUsuarioComponent } from './modules/editar-usuario/editar-usuario.component';
import { ModalPasswordComponent } from './modules/Custom/modal-password/modal-password.component';
import { RecoverPasswordComponent } from './modules/recover-password/recover-password.component';
import { ModalExitosoComponent } from './modules/Custom/modal-exitoso/modal-exitoso.component';
import { TableModule } from 'primeng/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TablasComponent } from './modules/Custom/tablas/tablas.component';
import { ModalConsultaMasivaComponent } from './modules/Custom/modal-consulta-masiva/modal-consulta-masiva.component';
import { ModalConsultaIndividualComponent } from './modules/Custom/modal-consulta-individual/modal-consulta-individual.component';
import { ModalGestionUsuarioComponent } from './modules/Custom/modal-gestion-usuario/modal-gestion-usuario.component';
import { ModalCargaMasivaComponent } from './modules/Custom/modal-carga-masiva/modal-carga-masiva.component';
import { ModalHistorialEquipoComponent } from './modules/Custom/modal-historial-equipo/modal-historial-equipo.component';
import { TablasEditarUsuarioComponent } from './modules/tablas-editar-usuario/tablas-editar-usuario.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModalResumenIngresoIndividualComponent } from './modules/Custom/modal-resumen-ingreso-individual/modal-resumen-ingreso-individual.component';
import { ModalEliminarComponent } from './modules/Custom/modal-eliminar/modal-eliminar.component';
import { ModalEditarComponent } from './modules/Custom/modal-editar/modal-editar.component';
import { NewlinePipe, TablasHistorialEquipoComponent } from './modules/tablas-historial-equipo/tablas-historial-equipo.component';
import { getSpanishPaginatorIntl } from './modules/tablas-historial-equipo/tablas-historial-equipo.component';
import { EquiposDuplicadosComponent } from './modules/equipos-duplicados/equipos-duplicados.component';
import { TablaEquiposDuplicadosComponent } from './modules/tabla-equipos-duplicados/tabla-equipos-duplicados.component';
import { AgenciaDcpComponent } from './modules/agencia-dcp/agencia-dcp.component';
import { NumeroInventarioComponent } from './modules/numero-inventario/numero-inventario.component';
import { ModalDuplicadoComponent } from './modules/Custom/modal-duplicado/modal-duplicado.component';
import { IngresarUsuarioComponent } from './modules/ingresar-usuario/ingresar-usuario.component';
import { ModalHistorialEquipoDcpComponent } from './modules/Custom/modal-historial-equipo-dcp/modal-historial-equipo-dcp.component';
import { ModalHistorialEquipoInventarioComponent } from './modules/Custom/modal-historial-equipo-inventario/modal-historial-equipo-inventario.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { RutFormatterDirective } from './directives/rut-formatter.directive';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordComponent,
    DataUsuarioRutComponent,
    ConsultaIndividualComponent,
    ConsultaMasivaComponent,
    IngresoIndividualComponent,
    EditarUsuarioComponent,
    ModalPasswordComponent,
    RecoverPasswordComponent,
    ModalExitosoComponent,
    TablasComponent,
    ModalConsultaMasivaComponent,
    ModalConsultaIndividualComponent,
    ModalGestionUsuarioComponent,
    ModalCargaMasivaComponent,
    ModalHistorialEquipoComponent,
    TablasEditarUsuarioComponent,
    ModalResumenIngresoIndividualComponent,
    ModalEliminarComponent,
    ModalEditarComponent,
    TablasHistorialEquipoComponent,
    NewlinePipe,
    EquiposDuplicadosComponent,
    TablaEquiposDuplicadosComponent,
    AgenciaDcpComponent,
    NumeroInventarioComponent,
    ModalDuplicadoComponent,
    IngresarUsuarioComponent,
    ModalHistorialEquipoDcpComponent,
    ModalHistorialEquipoInventarioComponent,
    UserProfileComponent,
    RutFormatterDirective
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule, // Añade AppRoutingModule aquí
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    MenuModule,
    DividerModule,
    CalendarModule,
    FormsModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    AmplifyAuthenticatorModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}