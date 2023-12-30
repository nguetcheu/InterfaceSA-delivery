import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    poids: 0,
    prix: 0,
    originCountry: '',
    destinationCountry: '',
    dateExpedition: '',
  };

  constructor(
    private firestore: AngularFirestore,
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

  submitForm() {
    const userId = this.firebase.getUserIdFromSessionStorage();
    const numeroDecommande = this.generateRandomOrderNumber();
    if (userId) {
      const commandData = { ...this.formData, userId, numeroDecommande };
      this.firestore
        .collection('commandes')
        .add(commandData)
        .then(() => {
          alert('Commande ajoutée avec succès.');
          this.router.navigate(['/client']);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la commande :", error);
        });
    } else {
      console.error('Aucun utilisateur connecté.');
    }
  }
}
