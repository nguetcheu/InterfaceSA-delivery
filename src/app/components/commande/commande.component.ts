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
  weight!: number;
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
          console.log('Orders:', data); // Ajoutez cette ligne pour vérifier les données
          this.orders = data;
        },
        error => {
          console.error('Erreur lors de la récupération des commandes', error);
        }
      );
    }
  }


  convert() {
    if (isNaN(this.weight)) {
      alert('Veuillez saisir un poids valide.');
      return;
    }

    if (this.weight >= 1 && this.weight <= 5) {
      this.cost = 10000;
    } else if (this.weight > 5 && this.weight <= 10) {
      this.cost = 15000;
    } else {
      alert('Le poids doit être compris entre 1 et 10 kg.');
      return;
    }
  }

  goToAddOrder() {
    this.router.navigate(['/commandeForm']);
  }
}
