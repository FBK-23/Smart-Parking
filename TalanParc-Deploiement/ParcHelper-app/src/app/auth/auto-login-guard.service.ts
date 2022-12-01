import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AutoLoginGuardService implements CanLoad {
	
  constructor(private authService: AuthService, private router: Router) {}

	public canLoad(): boolean {
		if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
	}
}