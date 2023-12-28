import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-fortgot-password',
  templateUrl: './fortgot-password.component.html',
  styleUrls: ['./fortgot-password.component.scss'],
})
export class FortgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  forgotPassword() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
