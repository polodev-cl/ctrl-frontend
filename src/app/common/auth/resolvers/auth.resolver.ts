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
  console.log('Resolver')
  return from(cognitoService.getCurrentUser()).pipe(
    switchMap(user => {
      if (user && user.username) {
        return userService.getUserByCognitoId(user.username).pipe(
          catchError(error => {
            cognitoService.signOut();
            return throwError(() => new Error('Failed to load user data.'));
          })
        );
      } else {
        cognitoService.signOut();
        return throwError(() => new Error('Failed to load user data.'));
      }
    })
  );
}
