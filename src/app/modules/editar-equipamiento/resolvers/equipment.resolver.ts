import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { EquipmentService } from "@common/equipment/services/equipment.service";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { NavigationService } from "@common/navigation/navigation.service";

export const equipmentResolver: ResolveFn<any | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const equipmentService = inject(EquipmentService);
  const navigationService = inject(NavigationService);
  const matSnackBar = inject(MatSnackBar);
  const id = route.paramMap.get('id');

  const snackBarConfig: MatSnackBarConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' };

  if (id && !isNaN(+id)) {
    return equipmentService.getEquipmentById(+id)
      .pipe(
        catchError((error) => {
          switch ( error.status ) {
            case 0:
              matSnackBar.open('No se pudo conectar al servidor', 'Cerrar', snackBarConfig);
              break;
            case 401:
            case 403:
              matSnackBar.open('No tienes permisos para ver este equipo', 'Cerrar', snackBarConfig);
              break;
            case 404:
              matSnackBar.open(`El equipo con id ${ id } no existe`, 'Cerrar', snackBarConfig);
              break;
            default:
              matSnackBar.open('Error desconocido', 'Cerrar', snackBarConfig);
              break;
          }
          throw error;
        }),
        catchError(() => {
          navigationService.back()
          return of(undefined);
        })
      );
  } else {
    matSnackBar.open('El id del equipo no es válido', 'Cerrar', snackBarConfig);
    // redirect to /equipamiento
    navigationService.back()
    return of(undefined);
  }
}
