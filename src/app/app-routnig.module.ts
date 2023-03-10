import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
// import { LoginComponent } from "./auth/login/login.component";
// import { SignupComponent } from "./auth/signup/signup.component";
// import { TrainingComponent } from "./training/training.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const  routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'training', loadChildren: () => import('./training/training.module').then((m)=> m.TrainingModule), canLoad:[AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
