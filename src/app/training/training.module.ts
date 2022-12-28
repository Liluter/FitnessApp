import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { MaterialModule } from "../material.module";
import { CurrentComponent } from "./current/current.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { StopTrainingComponent } from "./current/stop-training-component";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { SharedModule } from "../shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    TrainingRoutingModule,
    AngularFirestoreModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
