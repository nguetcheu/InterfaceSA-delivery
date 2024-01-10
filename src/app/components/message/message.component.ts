import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  messages!: any[];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  deleteMessage(messageId: string): void {
    this.adminService
      .deleteMessage(messageId)
      .then(() => {
        console.log('Message supprimé avec succès');
        // Recharger la liste des messages si nécessaire
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du message', error);
      });
  }
}
