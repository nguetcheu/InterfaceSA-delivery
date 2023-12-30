import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Composant commun a tout app web */
import { AccueilComponent } from './common/accueil/accueil.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { ConnexionComponent } from './common/connexion/connexion.component';
import { InscriptionComponent } from './common/inscription/inscription.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

/* Composant fonctionnel de application */

import { ClientComponent } from './components/client/client.component';
import { AdminComponent } from './components/admin/admin.component';
import { FortgotPasswordComponent } from './common/fortgot-password/fortgot-password.component';
import { VerifiyEmailComponent } from './common/verifiy-email/verifiy-email.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CommandeComponent } from './components/commande/commande.component';
import { CommandeFormComponent } from './components/commande-form/commande-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    ClientComponent,
    AccueilComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    AdminComponent,
    FortgotPasswordComponent,
    VerifiyEmailComponent,
    ContactFormComponent,
    CommandeComponent,
    CommandeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
