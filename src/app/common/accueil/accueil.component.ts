import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  store: Storage = sessionStorage;
  isLogged!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
