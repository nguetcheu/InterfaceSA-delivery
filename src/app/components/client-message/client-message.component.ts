import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-client-message',
  templateUrl: './client-message.component.html',
  styleUrls: ['./client-message.component.scss'],
})
export class ClientMessageComponent implements OnInit {
  messages: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getReplies().subscribe((replies) => {
      this.messages = replies;
      console.log(this.messages);
    });
  }
}
