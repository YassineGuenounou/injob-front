import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/modules/shared.module";
import { InterviewsRoutingModule } from "./interviews-routing.module";
import { InterviewsComponent } from "./interviews.component";
import { InterviewDetailsDialogComponent } from "./interview-details-dialog/interview-details.dialog.component";


@NgModule({
  declarations: [InterviewsComponent, InterviewDetailsDialogComponent],
  imports: [CommonModule, InterviewsRoutingModule, SharedModule],
})
export class InterviewsModule {}
