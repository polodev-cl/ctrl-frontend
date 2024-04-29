import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { IAgency } from "@modules/agency/domain/interface/agency.interface";
import { AgencyService } from "@modules/ingreso-individual/agency.service";

export const agencyResolver: ResolveFn<IAgency | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const agencyService = inject(AgencyService);
  const matSnackBar = inject(MatSnackBar);
  const id = route.paramMap.get('id');

  const snackBarConfig: MatSnackBarConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' };

  if (id && !isNaN(+id)) {
    return agencyService.getAgencyById(+id)
      .pipe(
        catchError((error) => {
          switch ( error.status ) {
            case 0:
              matSnackBar.open('No se pudo conectar al servidor', 'Cerrar', snackBarConfig);
              break;
            case 401:
            case 403:
              matSnackBar.open('No tienes permisos para ver esta empresa', 'Cerrar', snackBarConfig);
              break;
            case 404:
              matSnackBar.open(`La empresa con id ${ id } no existe`, 'Cerrar', snackBarConfig);
              break;
            default:
              matSnackBar.open('Error desconocido', 'Cerrar', snackBarConfig);
              break;
          }
          throw error;
        }),
        catchError(() => {
          router.navigate([ '/company' ]);
          return of(undefined);
        })
      );
  } else {
    matSnackBar.open('El id de la empresa no es válido', 'Cerrar', snackBarConfig);
    // redirect to /company
    router.navigate([ '/company' ]);
    return of(undefined);
  }
};
