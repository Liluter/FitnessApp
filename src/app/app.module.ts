import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AppRoutingModule } from "./app-routnig.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from "./auth/auth.service";
import { TrainingSevice } from "./training/training.service";
import { environment } from '../environments/environment';

import { UIService } from "./shared/ui.service";
import { AuthModule } from "./auth/auth.module";
// import { TrainingModule } from "./training/training.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
    // TrainingModule,
    AuthModule
  ],
  providers: [AuthService, TrainingSevice,UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}

