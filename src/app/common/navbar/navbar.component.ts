import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  goToLogin() {
    this.router.navigate(['connexion']);
  }

  goToSignUp() {
    this.router.navigate(['inscription']);
  }

  goToClient() {
    this.router.navigate(['client']);
  }

  getAuthentificated(): boolean {
    return (this.isAuthenticated = this.authService.getIsAuthenticated());
  }
}
