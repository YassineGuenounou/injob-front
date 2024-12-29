import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsOffersRoutingModule } from './job-offers-routing.module';
import { JobOffersComponent } from './job-offers.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [JobOffersComponent],
  imports: [CommonModule, JobsOffersRoutingModule, SharedModule],
})
export class JobOffersModule {}
