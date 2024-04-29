import { Routes } from "@angular/router";
import { AgencyComponent } from "@modules/agency/agency.component";
import { agencyResolver } from "@modules/agency/resolvers/agency.resolver";

export default [
  {
    path: '',
    component: AgencyComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/agency-list/agency-list.component').then(m => m.AgencyListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/agency-create/agency-create.component').then(m => m.AgencyCreateComponent)
      },
      {
        path: 'edit/:id',
        resolve: { agency: agencyResolver },
        loadComponent: () => import('./components/agency-edit/agency-edit.component').then(m => m.AgencyEditComponent)
      },
      { path: '**', redirectTo: '' }
    ]
  }
] as Routes;
