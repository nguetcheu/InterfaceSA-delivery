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

  // Obtenir la collection commandes depuis firestore
  getCommandes(): Observable<any[]> {
    // @ts-ignore
    return this.commandesCollection.valueChanges();
  }

  // Suppresion d'un commande de la collection
  deleteCommande(commandeId: string): Promise<void> {
    const commandeRef = this.firestore.collection('commandes').doc(commandeId);
    return commandeRef.delete();
  }

  // Méthode pour sommer le champ 'prix' de tous les documents de la collection 'commandes'
  sommePrix(): Observable<number> {
    // @ts-ignore
    return this.firestore
      .collection('commandes')
      .valueChanges()
      .pipe(
        // Utilisez l'opérateur reduce pour effectuer la somme
        // @ts-ignore
        map((commands: any[]) =>
          commands.reduce((acc, command) => acc + command.prix, 0)
        )
      );
  }

  // Méthode pour envoyer un message de réponse à un client
  replyToMessage(messageId: string, replyMessage: string): Promise<void> {
    // Créer un objet contenant les détails du message de réponse
    const replyData = {
      email: 'admin@gmail.com',
      message: replyMessage,
      // Ajoutez d'autres détails comme l'ID de l'administrateur, la date, etc., si nécessaire
    };

    // @ts-ignore
    // Mettre à jour la collection de messages avec le nouveau message de réponse
    return this.firestore
      .collection('messages')
      .doc(messageId)
      .collection('replies')
      .add(replyData);
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

  // Suppresion d'un message de la collection
  deleteMessage(messageId: string): Promise<void> {
    const messageRef = this.firestore.collection('messages').doc(messageId);
    return messageRef.delete();
  }

  // Obtenir la collection utilisateurs depuis firestore
  getUtilisateurs(): Observable<any[]> {
    // @ts-ignore
    return this.utilisateursCollection.valueChanges();
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
}
