import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingSevice } from "../training/training.service";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>(); // our event setup
  // private user!: User | null;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingSevice,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true); // true mean you are loggedin now
        this.router.navigate(["/training"]);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false); // true mean you are loggedout now
        this.router.navigate(["/login"]);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackbar(error.message, "", 3000); // central usage
        // this._snackBar.open(error.message,'' ,{duration:3000})
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChange.next(true); //for spinner state
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChange.next(false); // forem spinner state
      })
      .catch((error) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackbar(error.message, "", 3000); // central usage
        // this._snackBar.open(error.message,'' ,{duration:3000})
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
