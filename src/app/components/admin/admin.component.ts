import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  messages!: any[];
  utilisateurCount!: number;
  messageCount!: number;
  commandeCount!: number;
  montantCommande!: number;

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getMessages()
      .subscribe((messages) => (this.messages = messages));

    this.adminService.getMessageCount().subscribe((count) => {
      this.messageCount = count;
    });

    this.adminService.getCollectionCount().subscribe((count) => {
      this.commandeCount = count;
    });

    this.adminService.getUtilisateursCount().subscribe((utilisateurCount) => {
      this.utilisateurCount = utilisateurCount;
    });

    this.adminService.sommePrix().subscribe((montant) => {
      this.montantCommande = montant;
    });
  }

  logout() {
    this.authService.logout();
  }
}
