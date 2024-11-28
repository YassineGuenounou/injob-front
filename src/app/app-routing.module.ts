import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'jobs-offers',
    loadChildren: () =>
      import('./pages/jobs-offers/jobs-offers.module').then(
        (m) => m.JobsOffersModule
      ),
  },
  {
    path: '',
    redirectTo: 'jobs-offers',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
