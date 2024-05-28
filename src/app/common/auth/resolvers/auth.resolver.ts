import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CognitoService } from "../cognito-service.service";
import { UserService } from "@app/common/user/services/user.service";
import { catchError, switchMap } from 'rxjs/operators';
import { from, of, throwError } from 'rxjs';


export const appResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  cognitoService: CognitoService = inject(CognitoService),
  userService: UserService = inject(UserService)
) => {
  if (userService.activeUser) return of(userService.activeUser);

  return from(cognitoService.getCurrentUser()).pipe(
    switchMap(user => {
      if (user && user.username) {
        return userService.getUserByCognitoId(user.username).pipe(
          catchError(() => {
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
