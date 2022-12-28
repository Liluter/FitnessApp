import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingSevice {
  exerciseChanged = new Subject<Exercise | any>();
  exercisesChange = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[]>();


  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | any;
  private fbSubs: Subscription[] = [];

  // private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService ) {}

  fetchAvailableExercises() {
    // return this.availableExercises.slice(); // real copy of array
    this.uiService.loadingExercises.next(true);
    this.fbSubs.push(this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          // throw(new Error())
          return docArray.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Exercise),
              id: doc.payload.doc.id,
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChange.next([...this.availableExercises]); // we create copy to not pass arginal for mutability reasons
        this.uiService.loadingExercises.next(false);
      },error=>{
        this.uiService.loadingStateChange.next(false);
        this.uiService.loadingExercises.next(false);
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', '', 3000)
        this.exercisesChange.next(null);
      }))
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()}) //example
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed",
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled",
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCanceledExercises() {
    this.fbSubs.push(this.db
      .collection("finishedExercises")
      .valueChanges()
      .subscribe((exercises) => {
        this.finishedExercisesChanged.next(exercises as Exercise[]);
      }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise); // it store its on database
  }
}
