import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { AdminComponent } from './components/admin/admin.component';

/* Common component */

import { InscriptionComponent } from './common/inscription/inscription.component';
import { ConnexionComponent } from './common/connexion/connexion.component';
import { AccueilComponent } from './common/accueil/accueil.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { FortgotPasswordComponent } from './common/fortgot-password/fortgot-password.component';
import { VerifiyEmailComponent } from './common/verifiy-email/verifiy-email.component';

/* Restriction des routes */

import { AuthGuardAdmin } from './guards/admin.guard';
import { AuthGuard } from './guards/client.guard';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'forgot', component: FortgotPasswordComponent },
  { path: 'verify-email', component: VerifiyEmailComponent },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
