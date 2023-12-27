import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
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
        // Enregistre des informations supplémentaires dans Firestore avec le rôle par défaut "user"
        return this.firestore.collection('utilisateurs').doc(user?.uid).set({
          uid: user?.uid,
          email: email,
          displayName: displayName,
          role: 'client',
        });
      })
      .catch((error) => {
        throw error; // Gère les erreurs ici
      });
  }

  // Méthode de connexion
  login(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          // Vérifie le rôle et redirige en conséquence
          this.checkUserRoleAndRedirect(user.uid);
        }
      })
      .catch((error) => {
        throw error; // Gère les erreurs ici
      });
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
