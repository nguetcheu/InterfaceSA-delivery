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
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userEmail = await this.authService.getUserEmail();

    if (userEmail === 'admin@gmail.com') {
      // Accès autorisé pour l'utilisateur avec l'email spécifié
      return true;
    } else {
      // Redirigez vers une page non autorisée si l'email ne correspond pas
      alert('Cette page est pour admin');
      this.router.navigate(['/inscription']);
      return false;
    }
  }
}
