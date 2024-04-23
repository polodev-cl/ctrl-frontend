import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { CognitoService } from "../cognito-service.service";

export const AuthGuard: CanActivateFn | CanActivateChildFn = async (route, state) => {
  const router: Router = inject(Router);

  return inject(CognitoService).getCurrentUser()
    .then(() => true)
    .catch(() => {
      const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${ state.url }`;
      return router.parseUrl(`sign-in?${ redirectURL }`);
    });
}
