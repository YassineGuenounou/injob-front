import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'job-offers',
    loadChildren: () =>
      import('./pages/job-offers/job-offers.module').then(
        (m) => m.JobOffersModule
      ),
  },
  {
    path: 'job-applications',
    loadChildren: () =>
      import('./pages/job-applications/job-applications.module').then(
        (m) => m.JobApplicationsModule
      ),
  },
  {
    path: '',
    redirectTo: 'job-offers',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
