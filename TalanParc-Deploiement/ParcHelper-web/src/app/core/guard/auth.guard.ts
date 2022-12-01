import { Injectable } from '@angular/core';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  

  constructor(
    private authService: AuthService, 
    private router: Router,
    
    ) 
    {
      const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    var user = this.authService.currentUserValue
    if (!this.authService.isAuthenticated() || !route.data.roles.includes(user.role)) {
      this.router.navigate([this.router.url]);
      return false;
    } else  {
      return true;
    }
  }

}
