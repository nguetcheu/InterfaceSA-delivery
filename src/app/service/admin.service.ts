import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private messagesCollection: AngularFirestoreCollection<any>;
  private commandesCollection: AngularFirestoreCollection<any>;
  private utilisateursCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = this.firestore.collection('messages');
    this.commandesCollection = this.firestore.collection('commandes');
    this.utilisateursCollection = this.firestore.collection('utilisateurs');
  }

  // Obtenir la collection messages depuis firestore
  getMessages(): Observable<any[]> {
    // @ts-ignore
    return this.messagesCollection.valueChanges();
  }

  // Obtenir le nombre de messages depuis firestore
  getMessageCount(): Observable<number> {
    // @ts-ignore
    return this.messagesCollection.valueChanges().pipe(
      // @ts-ignore
      map((messages) => {
        return messages.length;
      })
    );
  }

  // Obtenir le nombre utilisateurs depuis firestore
  getUtilisateursCount(): Observable<number> {
    // @ts-ignore
    return this.utilisateursCollection.valueChanges().pipe(
      // @ts-ignore
      map((utilisateurs) => {
        return utilisateurs.length;
      })
    );
  }

  // Obtenir le nombre de commandes depuis firestore
  getCollectionCount(): Observable<number> {
    // @ts-ignore
    return this.commandesCollection.valueChanges().pipe(
      // @ts-ignore
      map((collection) => {
        return collection.length;
      })
    );
  }

  // Suppresion d'un message de la collection
  deleteMessage(messageId: string): Promise<void> {
    const messageRef = this.firestore.collection('messages').doc(messageId);
    return messageRef.delete();
  }
}
