import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { provideAnimations } from "@angular/platform-browser/animations";
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";

import { routes } from './app.routes';
import { authInterceptor } from "./core/config/interceptors/auth.interceptor";
import { getSpanishPaginatorIntl } from "./modules/tablas-historial-equipo/tablas-historial-equipo.component";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([ authInterceptor ])),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom(
      AmplifyAuthenticatorModule
    ),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ]
};
