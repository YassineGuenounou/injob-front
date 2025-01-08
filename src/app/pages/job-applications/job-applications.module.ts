import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/modules/shared.module';
import { JobApplicationsComponent } from './job-applications.component';
import { JobApplicationsRoutingModule } from './job-applications-routing.module';
import { JobApplicationDetailsDialogComponent } from './job-application-details-dialog/job-application-details.dialog.component';

@NgModule({
  declarations: [JobApplicationsComponent, JobApplicationDetailsDialogComponent],
  imports: [CommonModule, JobApplicationsRoutingModule, SharedModule],
})
export class JobApplicationsModule {}
