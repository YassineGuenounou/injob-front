import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsOffersRoutingModule } from './jobs-offers-routing.module';
import { JobsOffersComponent } from './jobs-offers.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [JobsOffersComponent],
  imports: [CommonModule, JobsOffersRoutingModule, SharedModule],
})
export class JobsOffersModule {}
