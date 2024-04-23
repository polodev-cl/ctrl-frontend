import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { CognitoService } from "../../cognito-service.service";

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = async (route, state) => {
  const router: Router = inject(Router);

  return inject(CognitoService).getCurrentUser()
    .then(() => {
      return router.parseUrl('home');
    })
    .catch(() => true);
}

