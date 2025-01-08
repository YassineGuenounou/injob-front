import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobOffersComponent } from './job-offers.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { JobOffersRoutingModule } from './job-offers-routing.module';
import { JobOfferDetailsComponent } from './job-offer-details-dialog/job-offer-details.component';

@NgModule({
  declarations: [JobOffersComponent, JobOfferDetailsComponent],
  imports: [CommonModule, JobOffersRoutingModule, SharedModule],
})
export class JobOffersModule {}
