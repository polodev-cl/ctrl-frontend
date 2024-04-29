import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { Company, CompanyService } from "@app/services/company.service";
import { catchError, of } from "rxjs";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

export const companyResolver: ResolveFn<Company | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const companyService = inject(CompanyService);
  const matSnackBar = inject(MatSnackBar);
  const id = route.paramMap.get('id');

  const snackBarConfig: MatSnackBarConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' };

  if (id && !isNaN(+id)) {
    return companyService.getCompanyById(+id)
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
