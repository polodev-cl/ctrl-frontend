import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticatorService } from "@aws-amplify/ui-angular";
import { fetchAuthSession } from "aws-amplify/auth";
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthenticatorService);

  return from(fetchAuthSession()).pipe(
    switchMap(session => {
      const token = session.tokens?.accessToken;
      let newReq = req;

      if (token) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${ token }`),
        });
      }

      return next(newReq);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.signOut();
        location.reload();
      }
      return throwError(() => error);
    })
  );
}
