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

  replyToMessage(messageId: string, userEmail: string): void {
    const replyMessage = window.prompt('Répondre à ' + userEmail + ' :');
    if (replyMessage !== null) {
      this.adminService
        .replyToMessage(messageId, replyMessage)
        .then(() => {
          alert('Message de réponse envoyé avec succès à Firebase');
        })
        .catch((error) => {
          alert("Erreur lors de l'envoi du message de réponse à :" + userEmail);
        });
    }
  }
}
