import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciaDcpComponent } from './modules/agencia-dcp/agencia-dcp.component';
import { ConsultaIndividualComponent } from './modules/consulta-individual/consulta-individual.component';
import { ConsultaMasivaComponent } from './modules/consulta-masiva/consulta-masiva.component';
import { DataUsuarioRutComponent } from './modules/data-usuario-rut/data-usuario-rut.component';
import { EditarUsuarioComponent } from './modules/editar-usuario/editar-usuario.component';
import { EquiposDuplicadosComponent } from './modules/equipos-duplicados/equipos-duplicados.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component'; // Importa el componente de recuperación de contraseña
import { HomeComponent } from './modules/home/home.component';
import { IngresarUsuarioComponent } from './modules/ingresar-usuario/ingresar-usuario.component';
import { IngresoIndividualComponent } from './modules/ingreso-individual/ingreso-individual.component';
import { NumeroInventarioComponent } from './modules/numero-inventario/numero-inventario.component';
import { RecoverPasswordComponent } from './modules/recover-password/recover-password.component';
import { VerificarUsuarioComponent } from './modules/verificar-usuario/verificar-usuario.component';

const routes: Routes = [
  // Not logged required
  {
    path: 'auth',
    children: [
      { path: 'sign-in', loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent) },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'recover-password', component: RecoverPasswordComponent },
      { path: 'verify-user', component: VerificarUsuarioComponent },
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    ]
  },

  // Logged required
  { path: 'home', component: HomeComponent },
  { path: 'consulta-individual', component: ConsultaIndividualComponent },
  { path: 'consulta-masiva', component: ConsultaMasivaComponent },
  { path: 'data-usuario-rut', component: DataUsuarioRutComponent },
  { path: 'data-numero-inventario', component: NumeroInventarioComponent },
  { path: 'data-agencia-dcp', component: AgenciaDcpComponent },
  { path: 'equipos-duplicados', component: EquiposDuplicadosComponent },
  { path: 'ingreso-individual', component: IngresoIndividualComponent },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'ingresar-usuario', component: IngresarUsuarioComponent },
  { path: 'equipos-duplicados', component: EquiposDuplicadosComponent },


  // reemplazadas
  // {path: 'forgot-password', component: ForgotPasswordComponent},
  // {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
