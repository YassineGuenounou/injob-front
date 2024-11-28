import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsOffersComponent } from './jobs-offers.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: JobsOffersComponent, canActivate: [AuthGuard] },
  {
    path: ':id',
    loadChildren: () =>
      import('../job-offer-details/job-offer-details.module').then(
        (m) => m.JobOfferDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsOffersRoutingModule {}
