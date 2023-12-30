import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss'],
})
export class CommandeFormComponent implements OnInit {
  commandeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.commandeForm = this.fb.group({
      emailExpediteur: ['', Validators.required],
      numeroCommande: ['', Validators.required],
      poids: ['', Validators.required],
      prix: ['', Validators.required],
      paysOrigine: ['', Validators.required],
      paysArrivee: ['', Validators.required],
      dateLivraison: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.commandeForm.valid) {
      const commandeData = {
        ...this.commandeForm.value,
        clientId: 'ID_DU_CLIENT_ACTUEL', // Remplacez cela par la logique pour obtenir l'ID du client actuel
      };

      this.firebaseService
        .addCommande(commandeData)
        .then(() => {
          console.log('Commande ajoutée avec succès');
          this.commandeForm.reset();
        })
        .catch((error) =>
          console.error("Erreur lors de l'ajout de la commande", error)
        );
    }
  }
}
