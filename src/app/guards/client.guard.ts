import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    const storedUserString = sessionStorage.getItem('user');

    if (storedUserString) {
      // Si l'utilisateur est présent dans sessionStorage, restez sur la page
      return true;
    } else {
      // Si l'utilisateur n'est pas présent dans sessionStorage, vérifiez l'authentification Firebase
      return this.checkFirebaseAuthentication(state.url);
    }
  }

  private async checkFirebaseAuthentication(redirectUrl: string): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;

    if (!isAuthenticated) {
      // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié
      alert('Veuillez vous connecter pour accéder à cette page');
      this.router.navigate(['/connexion']);
      return false;
    }

    // Stocke les informations d'authentification dans sessionStorage
    sessionStorage.setItem('user', JSON.stringify({
      uid: user?.uid,
      email: user?.email,
      // Ajoutez d'autres informations que vous souhaitez stocker
    }));

    return true;
  }
}
