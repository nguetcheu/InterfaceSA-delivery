import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.email, this.password).catch((error) => {
      if (this.email == '') {
        alert('Pardon entrer email');
        return;
      }

      if (this.password == '') {
        alert('Pardon entrer password');
        return;
      }
      console.error('Erreur lors de la connexion :', error);
      // Gère les erreurs ici
    });
  }

  goToSignUp() {
    this.router.navigate(['inscription']);
  }
}
