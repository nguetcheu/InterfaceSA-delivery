import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getUserIdFromSessionStorage(): string | null {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      console.log(userData.uid);
      return userData.uid;
    }
    return null;
  }

  getOrdersByUUID(uid: string) {
    // Utilisez AngularFirestore pour récupérer les commandes en fonction de l'UUID
    return this.firestore
      .collection('commandes', (ref) => ref.where('userId', '==', uid))
      .valueChanges();
  }

  addCommande(commande: any) {
    return this.firestore.collection('commandes').add(commande);
  }
}
