import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CognitoService } from "../cognito-service.service";

export const appResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  cognitoService: CognitoService = inject(CognitoService),
) => {
  return cognitoService.getCurrentUser().catch(() => cognitoService.signOut());
}
