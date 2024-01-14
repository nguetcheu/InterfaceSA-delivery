import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: FirebaseService,
    private router: Router
  ) {}

  async getUserEmail(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.email : null;
  }

  // Méthode d'inscription qui enregistre également des informations dans Firestore
  signup(email: string, password: string, displayName: string): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.isAuthenticated = true;
        // Enregistre des informations supplémentaires dans Firestore avec le rôle par défaut "client"
        return this.firestore
          .collection('utilisateurs')
          .doc(user?.uid)
          .set({
            uid: user?.uid,
            email: email,
            displayName: displayName,
            role: 'client',
          })
          .then(() => {
            // Stocke les informations d'authentification dans sessionStorage
            sessionStorage.setItem(
              'user',
              JSON.stringify({
                uid: user?.uid,
                email: email,
                role: 'client',
              })
            );
          });
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Méthode de connexion
  login(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.isAuthenticated = true;
          // Récupère les informations supplémentaires depuis Firestore
          this.firestore
            .collection('utilisateurs')
            .doc(user.uid)
            .get()
            .subscribe((doc) => {
              if (doc.exists) {
                const userData = doc.data() as { role: string };

                // Stocke les informations d'authentification dans sessionStorage
                sessionStorage.setItem(
                  'user',
                  JSON.stringify({
                    uid: user.uid,
                    email: email,
                    role: userData.role,
                  })
                );

                // Vérifie le rôle et redirige en conséquence
                this.checkUserRoleAndRedirect(user.uid);
              }
            });
        }
      })
      .catch((error) => {
        alert(error);
        throw error;
      });
  }

  getUser(): Observable<any> {
    // Récupérer l'UID de l'utilisateur connecté
    const userId = this.authService.getUserIdFromSessionStorage();

    // @ts-ignore
    // Récupérer les données de l'utilisateur depuis Firestore
    return this.firestore.collection('utilisateurs').doc(userId).valueChanges();
  }

  // Check if user is authenticated
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Méthode de déconnexion
  logout(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        // Supprime les informations d'authentification de sessionStorage
        this.router.navigate(['/']);
        sessionStorage.removeItem('user');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        throw error;
      });
  }

  // mot de passe oublié
  forgotPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email');
      }
    );
  }

  // Vérifie le rôle de l'utilisateur et redirige en conséquence
  private checkUserRoleAndRedirect(uid: string) {
    this.firestore
      .collection('utilisateurs')
      .doc(uid)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          const userData = doc.data() as { role: string }; // Type assertion
          const role = userData.role;
          if (role === 'admin') {
            this.router.navigate(['/admin']); // Redirige vers la page d'administration
          } else {
            this.router.navigate(['/client']); // Redirige vers la page client
          }
        }
      });
  }
}
