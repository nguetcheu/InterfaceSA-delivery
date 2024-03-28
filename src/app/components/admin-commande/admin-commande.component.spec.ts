import { Router } from '@angular/router';
import { AdminCommandeComponent } from './admin-commande.component';
import { AdminService } from 'src/app/service/admin.service';

describe('AdminCommandeComponent', () => {
  let component: AdminCommandeComponent;
  let adminService: AdminService;
  let router: Router;

  beforeEach(() => {
    adminService = jasmine.createSpyObj('AdminService', [
      'getCommandes',
      'deleteCommande',
    ]); // Créer un mock pour AdminService
    component = new AdminCommandeComponent(adminService, router); // Passer le mock de AdminService
  });

  it('il devra créer', () => {
    expect(component).toBeTruthy();
  });

  it('Il devra imprimer le tableau', () => {
    const windowSpy = spyOn(window, 'print'); // Espionner la fonction window.print()

    component.printTable();

    expect(windowSpy).toHaveBeenCalled(); // Vérifier si window.print() a été appelé
  });
});
