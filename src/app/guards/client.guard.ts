import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat//auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour accéder a cette page');
      this.router.navigate(['/inscription']);
    }
    return isAuthenticated;
  }
}
