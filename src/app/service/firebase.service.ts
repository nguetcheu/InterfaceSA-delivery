import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  order!: any;
  constructor(private firestore: AngularFirestore) {}

  // Récuperation de uid depuis sessionStorage
  getUserIdFromSessionStorage(): string | null {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      return userData.uid;
    }
    return null;
  }

  // Utilisez AngularFirestore pour récupérer les commandes en fonction de l'UUID
  getOrdersByUUID(uid: string) {
    return this.firestore
      .collection('commandes', (ref) => ref.where('userId', '==', uid))
      .valueChanges();
  }

  // Ajout d'une commande
  addCommande(commande: any): Promise<void> {
    // Générez un ID spécifique pour la commande
    const commandId = this.firestore.createId();

    // Ajoutez la commande avec l'ID spécifique
    return this.firestore
      .collection('commandes')
      .doc(commandId)
      .set({
        ...commande,
        id: commandId, // Vous pouvez inclure l'ID dans les données de la commande si nécessaire
      });
  }

  // envoyer un email
  sendEmail(message: any): Promise<void> {
    // Générez un ID spécifique pour la commande
    const emailId = this.firestore.createId();

    // Ajoutez email avec l'ID spécifique
    return this.firestore
      .collection('messages')
      .doc(emailId)
      .set({
        ...message,
        id: emailId, // Vous pouvez inclure l'ID dans les données de la commande si nécessaire
      });
  }

  // Récuperation d'une commande par id
  getOrderById(orderId: string): Observable<any> {
    const orderDocRef = this.firestore.collection('commandes').doc(orderId);
    // @ts-ignore
    this.order = orderDocRef.valueChanges().pipe(first());
    return this.order;
  }

  // Mise a jour d'une commande
  updateCommand(commandId: string, updatedCommand: any): Promise<void> {
    return this.firestore
      .collection('commandes')
      .doc(commandId)
      .update(updatedCommand);
  }

  getReplies(): Observable<any[]> {
    // @ts-ignore
    return this.firestore
      .collection('messages')
      .valueChanges({ idField: 'id' });
  }
}
