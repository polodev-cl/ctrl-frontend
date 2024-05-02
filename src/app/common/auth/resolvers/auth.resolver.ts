import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CognitoService } from "../cognito-service.service";
import { UserService } from "@app/common/user/services/user.service";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { UserDataService } from "@app/common/user/services/user-data.service";


export const appResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  cognitoService: CognitoService = inject(CognitoService),
  userService: UserService = inject(UserService),
  userDataService: UserDataService = inject(UserDataService) 
) => {
  return from(cognitoService.getCurrentUser()).pipe(
    switchMap(user => {
      console.log("Usuario actual de Cognito:", user);
      if (user && user.username) {
        console.log("ID del usuario de Cognito:", user.username);
        return userService.getUserByCognitoId(user.username).pipe(
          tap(userData => {
            userDataService.setUserData(userData);
            console.log("Datos de usuario almacenados en UserDataService:", userDataService.getUserData());
            console.log("Rol del usuario:", userDataService.getUserRole());
          }),
          catchError(error => {
            console.error("Error al obtener información del usuario:", error);
            cognitoService.signOut();
            return throwError(() => new Error('Failed to load user data.'));
          })
        );
      } else {
        console.error("No se pudo obtener el nombre de usuario de Cognito.");
        cognitoService.signOut();
        return throwError(() => new Error('Failed to load user data.'));
      }
    })
  );
}
