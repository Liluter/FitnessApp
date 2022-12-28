import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Exercise } from "../exercise.model";
import { TrainingSevice } from "../training.service";
import { Subscription } from "rxjs";
import { UIService } from "src/app/shared/ui.service";
// export interface Item { name: string; }

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // exercises!: Exercise[];
  exercises!: Exercise[] | null;
  isLoading = false;
  private exerciseSubscription!: Subscription;
  private loadingSubs!: Subscription;

  constructor(
    private trainingService: TrainingSevice,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises(); // old attempt
    this.loadingSubs = this.uiService.loadingExercises.subscribe(isLoading => this.isLoading = isLoading);
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }



  ngOnDestroy() {
    if (this.loadingSubs){
      this.loadingSubs.unsubscribe()
    }
    if (this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
  }
}

