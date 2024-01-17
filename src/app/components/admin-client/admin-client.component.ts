import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['./admin-client.component.scss'],
})
export class AdminClientComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(
    private adminService: AdminService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.utilisateurs = this.adminService
      .getUtilisateurs()
      .subscribe((utilisateurs) => {
        this.utilisateurs = utilisateurs;
      });
  }

  // Suppresion d'un commande de la collection
  deleteUtilisateur(utilisateurId: string): Promise<void> {
    const utilisateurRef = this.firestore
      .collection('utilisateurs')
      .doc(utilisateurId);
    return utilisateurRef.delete();
  }
}
