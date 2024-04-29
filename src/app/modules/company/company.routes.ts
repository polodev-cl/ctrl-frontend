import { Routes } from "@angular/router";
import { CompanyComponent } from "./company.component";
import { companyResolver } from "@modules/company/resolvers/company.resolver";

export default [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/company-list/company-list.component').then(m => m.CompanyListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/company-create/company-create.component').then(m => m.CompanyCreateComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/company-edit/company-edit.component').then(m => m.CompanyEditComponent),
        resolve: {
          company: companyResolver
        }
      },
      { path: '**', redirectTo: '' }
    ]
  }
] as Routes;
