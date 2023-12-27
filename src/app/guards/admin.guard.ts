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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const storedUserString = sessionStorage.getItem('user');

    if (storedUserString) {
      // Si l'utilisateur est présent dans sessionStorage, analysez l'objet user
      const storedUser = JSON.parse(storedUserString);

      if (storedUser && storedUser.email === 'admin@gmail.com' && storedUser.role === 'admin') {
        // Accès autorisé pour l'utilisateur avec l'email spécifié et le rôle admin
        return true;
      } else {
        // Redirigez vers une page non autorisée si l'utilisateur n'a pas le rôle d'admin
        alert('Cette page est réservée aux administrateurs.');
        this.router.navigate(['/connexion']);
        return false;
      }
    } else {
      // Redirigez vers la page de connexion si l'utilisateur n'est pas présent dans sessionStorage
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
