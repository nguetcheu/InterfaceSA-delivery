import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  formData = {
    name: '',
    email: '',
    message: '',
    phone: +237 ,
  };

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitForm() {
    const userId = this.firebase.getUserIdFromSessionStorage();
    if (userId) {
      const messageData = { ...this.formData, userId };
      this.firebase
        .sendEmail(messageData)
        .then(() => {
          alert('email envoyé avec succès.');
          this.router.navigate(['/client']);
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du mail :", error);
        });
    } else {
      console.error('Aucun utilisateur connecté.');
    }
  }
}
