import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { InscriptionComponent } from './common/inscription/inscription.component';
import { ConnexionComponent } from './common/connexion/connexion.component';
import { AccueilComponent } from './common/accueil/accueil.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'client', component: ClientComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
