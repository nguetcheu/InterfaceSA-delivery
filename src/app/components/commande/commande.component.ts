import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})
export class CommandeComponent implements OnInit {
  weight!: number;
  cost!: number;
  orders: any[] = [];

  constructor() {}

  ngOnInit(): void {}

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

  goToAddOrder() {}
}
