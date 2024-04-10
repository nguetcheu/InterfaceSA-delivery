import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss'],
})
export class CommandeFormComponent implements OnInit {
  countries: any[] = [];

  formData = {
    senderEmail: '',
    numeroDecommande: '',
    phone: 0,
    prix: 0,
    nbreColis: 0,
    modeTransport: '',
    originCountry: '',
    destinationCountry: '',
    dateExpedition: '',
    statut: 'enAttente',
    weightOrVolume: 0,
  };

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
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
  }

  // géneration d'un numéro de commande
  generateRandomOrderNumber(): string {
    const length = 8; // Vous pouvez ajuster la longueur du numéro de commande selon vos besoins
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // fonction pour calculer automatiquement le prix
  calculatePrice(): void {
    if (this.formData.modeTransport === 'Terrestre') {
      // Par exemple, 1000 francs par kilogramme pour le transport terrestre
      this.formData.prix = this.formData.weightOrVolume * 1000;
    } else if (this.formData.modeTransport === 'Bateau') {
      // Par exemple, 2000 francs par kilogramme pour le transport par bateau
      this.formData.prix = this.formData.weightOrVolume * 2000;
    } else {
      // Cas par défaut, si le mode de transport n'est pas spécifié
      this.formData.prix = 0;
    }
  }

  // Appele de la fonction chaque fois que le poids ou le mode de transport change
  onWeightOrTransportChange(): void {
    this.calculatePrice();
  }

  submitForm() {
    const userId = this.firebase.getUserIdFromSessionStorage();
    const numeroDecommande = this.generateRandomOrderNumber();
    if (userId) {
      const commandData = { ...this.formData, userId, numeroDecommande };
      this.firebase
        .addCommande(commandData)
        .then(() => {
          alert('Commande ajoutée avec succès.');
          this.router.navigate(['/commande']);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la commande :", error);
        });
    } else {
      console.error('Aucun utilisateur connecté.');
    }
  }
}
