import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-commande',
  templateUrl: './admin-commande.component.html',
  styleUrls: ['./admin-commande.component.scss'],
})
export class AdminCommandeComponent implements OnInit {
  commandes!: any[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCommandes().subscribe((commandes) => {
      this.commandes = commandes;
    });
  }

  deleteCommande(messageId: string): void {
    this.adminService
      .deleteCommande(messageId)
      .then(() => {
        console.log('Commande supprimé avec succès');
        // Recharger la liste des messages si nécessaire
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la commande', error);
      });
  }
}
