import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  displayName: string = 'User';

  menuActive: boolean = false; // Propriété pour suivre l'état du menu

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user && user.displayName) {
        this.displayName = user.displayName;
      }
    });
  }

  // Méthode pour changer l'état du menu
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  goToHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }
}
