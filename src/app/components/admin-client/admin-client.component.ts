import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['./admin-client.component.scss'],
})
export class AdminClientComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.utilisateurs = this.adminService
      .getUtilisateurs()
      .subscribe((utilisateurs) => {
        this.utilisateurs = utilisateurs;
      });
  }
}
