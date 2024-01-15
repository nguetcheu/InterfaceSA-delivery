import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})
export class CommandeComponent implements OnInit {
  montantEuro!: number;
  cost!: number;
  orders: any[] = [];

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const userUUID = this.firebase.getUserIdFromSessionStorage();

    if (userUUID) {
      this.firebase.getOrdersByUUID(userUUID).subscribe(
        (data: any[]) => {
          // Ajoutez cette ligne pour vérifier les données
          this.orders = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes', error);
        }
      );
    }
  }

  convert() {
    if (isNaN(this.montantEuro)) {
      alert('Veuillez saisir un poids valide.');
      return;
    }

    if (this.montantEuro > 1) {
      this.cost = this.montantEuro * 655;
    } else {
      alert('La somme doit être supérieur a 1 euros.');
      return;
    }
  }

  goToAddOrder() {
    this.router.navigate(['/commandeForm']);
  }

  editOrder(orderId: string): void {
    this.router.navigate(['/edit-commande', orderId]);
  }

  // Suppresion d'un commande de la collection
  deleteCommande(commandeId: string): Promise<void> {
    const commandeRef = this.firestore.collection('commandes').doc(commandeId);
    return commandeRef.delete();
  }

  // Méthode pour afficher le poids ou le volume réel de Firebase
  getWeightOrVolume(order: any): string {
    return order.modeTransport === 'Bateau'
      ? order.weightOrVolume + ' mètre cube'
      : order.weightOrVolume + ' kg';
  }
}
