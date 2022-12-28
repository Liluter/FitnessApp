import { Component, OnInit} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TrainingSevice } from "../training.service";
import { StopTrainingComponent } from "./stop-training-component";

@Component({
  selector: "app-current",
  templateUrl: "./current.component.html",
  styleUrls: ["./current.component.css"],
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timer: any;


  constructor(private dialog: MatDialog, private trainingService: TrainingSevice) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration! / 100 * 1000; //using data from model
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
        // this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}

