import { CanActivateFn, Router } from "@angular/router";
import { RoleEnum } from "../enums/role.enum";
import { inject } from "@angular/core";
import { UserService } from "@app/common/user/services/user.service";

export function roleGuard(requiredRoles: RoleEnum[], defaultRedirect: string = '/'): CanActivateFn {
    console.log('Guard Role')
    return () => {
        const userService = inject(UserService);
        const router = inject(Router);

        const userRole = userService.activeUser.rolId;
        
        return requiredRoles.includes(userRole) || router.createUrlTree([defaultRedirect]);
    }
}