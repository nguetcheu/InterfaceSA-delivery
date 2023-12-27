import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  email: string = '';
  password: string = '';
  displayName: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup() {
    this.authService
      .signup(this.email, this.password, this.displayName)
      .then(() => {
        console.log('Inscription réussie !');
        this.router.navigate(['client']);
        // Redirige l'utilisateur ou effectue d'autres actions après l'inscription réussie
      })
      .catch((error) => {
        console.error('Erreur lors de inscription :', error);
        this.error = error;
        // Gère les erreurs ici
      });
  }
}
