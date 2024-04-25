import { Routes } from '@angular/router';
import { AuthGuard } from "./common/auth/guards/auth.guard";
import { NoAuthGuard } from "./common/auth/guards/no-auth.guard";
import { appResolver } from "./common/auth/resolvers/auth.resolver";
import { CompanyService } from './services/company.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // Not logged required
  {
    path: '',
    canActivate: [ NoAuthGuard ],
    canActivateChild: [ NoAuthGuard ],
    children: [
      { path: 'sign-in', loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./modules/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'recover-password', loadComponent: () => import('./modules/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent) },
      { path: 'verify-user', loadComponent: () => import('./modules/verificar-usuario/verificar-usuario.component').then(m => m.VerificarUsuarioComponent) },
    ]
  },

  // Logged required
  {
    path: '',
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    resolve: {
      authenticatedUser: appResolver,
      companies: () => inject(CompanyService).getCompanies()
    },
    children: [
      { path: 'home', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
      { path: 'consulta-individual', loadComponent: () => import('./modules/consulta-individual/consulta-individual.component').then(m => m.ConsultaIndividualComponent) },
      { path: 'consulta-masiva', loadComponent: () => import('./modules/consulta-masiva/consulta-masiva.component').then(m => m.ConsultaMasivaComponent) },
      { path: 'data-usuario-rut', loadComponent: () => import('./modules/data-usuario-rut/data-usuario-rut.component').then(m => m.DataUsuarioRutComponent) },
      { path: 'data-numero-inventario', loadComponent: () => import('./modules/numero-inventario/numero-inventario.component').then(m => m.NumeroInventarioComponent) },
      { path: 'data-agencia-dcp', loadComponent: () => import('./modules/agencia-dcp/agencia-dcp.component').then(m => m.AgenciaDcpComponent) },
      { path: 'equipos-duplicados', loadComponent: () => import('./modules/equipos-duplicados/equipos-duplicados.component').then(m => m.EquiposDuplicadosComponent) },
      { path: 'ingreso-individual', loadComponent: () => import('./modules/ingreso-individual/ingreso-individual.component').then(m => m.IngresoIndividualComponent) },
      {
        path: 'users',
        children: [
          { path: 'editar-usuario', loadComponent: () => import('./modules/editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent) },
          { path: 'ingresar-usuario', loadComponent: () => import('./modules/ingresar-usuario/ingresar-usuario.component').then(m => m.IngresarUsuarioComponent) },
          { path: 'equipos-duplicados', loadComponent: () => import('./modules/equipos-duplicados/equipos-duplicados.component').then(m => m.EquiposDuplicadosComponent) },
        ]
      },
    ]
  }
];
