import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component'; // Importa el componente de recuperación de contraseña
import { HomeComponent } from './modules/home/home.component';
import { DataUsuarioRutComponent } from './modules/data-usuario-rut/data-usuario-rut.component';
import { ConsultaIndividualComponent } from './modules/consulta-individual/consulta-individual.component';
import { ConsultaMasivaComponent } from './modules/consulta-masiva/consulta-masiva.component';
import { IngresoIndividualComponent } from './modules/ingreso-individual/ingreso-individual.component';
import { RecoverPasswordComponent } from './modules/recover-password/recover-password.component';
import { ModalExitosoComponent } from "./modules/Custom/modal-exitoso/modal-exitoso.component";
import { EditarUsuarioComponent } from './modules/editar-usuario/editar-usuario.component';
import { EquiposDuplicadosComponent } from './modules/equipos-duplicados/equipos-duplicados.component';
import { NumeroInventarioComponent } from './modules/numero-inventario/numero-inventario.component';
import { AgenciaDcpComponent } from './modules/agencia-dcp/agencia-dcp.component';
import { IngresarUsuarioComponent } from './modules/ingresar-usuario/ingresar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'consulta-individual', component: ConsultaIndividualComponent },
  { path: 'consulta-masiva', component: ConsultaMasivaComponent },
  { path: 'data-usuario-rut', component: DataUsuarioRutComponent },
  { path: 'data-numero-inventario', component: NumeroInventarioComponent },
  { path: 'data-agencia-dcp', component: AgenciaDcpComponent  },
  { path: 'equipos-duplicados', component: EquiposDuplicadosComponent },
  { path: 'ingreso-individual', component: IngresoIndividualComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'ingresar-usuario', component: IngresarUsuarioComponent },
  { path: 'equipos-duplicados', component: EquiposDuplicadosComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }