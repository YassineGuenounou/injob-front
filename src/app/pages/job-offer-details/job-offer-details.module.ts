import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobOfferDetailsRoutingModule } from './job-offer-details-routing.module';
import { JobOfferDetailsComponent } from './job-offer-details.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [JobOfferDetailsComponent],
  imports: [CommonModule, JobOfferDetailsRoutingModule, SharedModule],
})
export class JobOfferDetailsModule {}
