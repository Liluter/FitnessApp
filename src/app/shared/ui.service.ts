import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable()
export class UIService {
  loadingStateChange = new Subject<boolean>();
  loadingExercises = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar){}

  //for central control of snackbars
  showSnackbar(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
