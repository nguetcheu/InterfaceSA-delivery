import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-edit-commande',
  templateUrl: './edit-commande.component.html',
  styleUrls: ['./edit-commande.component.scss'],
})
export class EditCommandeComponent implements OnInit {
  orderId!: string;
  orderDetails: any;
  countries: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http // Appel à l'API Restcountries pour obtenir la liste des pays africains
      .get<any[]>('https://restcountries.com/v2/region/africa')
      .subscribe(
        (data) => {
          // Remplir la liste des pays
          this.countries = data;
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des pays africains',
            error
          );
        }
      );

    // Récupérez l'ID de la commande à partir de la route
    this.orderId = this.route.snapshot.params['id'];

    this.firebase.getOrderById(this.orderId).subscribe(
      (order) => {
        if (order) {
          this.orderDetails = order;
          console.log('Order details:', this.orderDetails);
        } else {
          console.error('Order not found.');
        }
      },
      (error) => {
        console.error('Error getting order details:', error);
      }
    );
  }

  // Ajoutez cette fonction pour calculer automatiquement le prix
  calculatePrice(): void {
    // Ajoutez vos propres règles pour calculer le prix en fonction du poids et du mode de transport
    if (this.orderDetails.modeTransport === 'terrestre') {
      // Par exemple, 1000 francs par kilogramme pour le transport terrestre
      this.orderDetails.prix = this.orderDetails.poids * 1000;
    } else if (this.orderDetails.modeTransport === 'bateau') {
      // Par exemple, 2000 francs par kilogramme pour le transport par bateau
      this.orderDetails.prix = this.orderDetails.poids * 2000;
    } else {
      // Cas par défaut, si le mode de transport n'est pas spécifié
      this.orderDetails.prix = 0;
    }
  }

  // Appelez cette fonction chaque fois que le poids ou le mode de transport change
  onWeightOrTransportChange(): void {
    this.calculatePrice();
  }

  onSubmit(): void {
    if (this.orderId && this.orderDetails) {
      // Mettez à jour la commande dans la collection
      this.firebase.updateCommand(this.orderId, this.orderDetails).then(
        () => {
          console.log('Order updated successfully.');
          // Naviguez vers la page des commandes ou une autre page après la mise à jour réussie
          this.router.navigate(['/commande']);
        },
        (error) => {
          console.error('Error updating order:', error);
        }
      );
    } else {
      console.error('Invalid orderId or orderDetails.');
    }
  }
}
