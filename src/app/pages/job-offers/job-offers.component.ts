import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { JobOffersService } from 'src/app/services/job-offers.service';
import {
  IJobOfferResponse,
  IJobOffersListDomain,
} from 'src/app/shared/models/jobs-offers-domain.model';
import { JobOffersPgeActions } from 'src/app/store/actions/job-offers.actions';
import { getJobOffersListDomain_selector } from 'src/app/store/selectors/job-offers.selectors';
import { JobOfferDetailsComponent } from '../job-offer-details/job-offer-details.component';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit {
  protected readonly filteredData = new MatTableDataSource<IJobOfferResponse>();
  protected readonly columns: string[] = [
    'id',
    'type',
    'description',
    'publish',
    'edit',
  ];

  sub!: Subscription;

  /**
   *
   * @param router
   * @param store
   */
  constructor(
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(getJobOffersListDomain_selector)
      .subscribe((_JobOffersListDomain: IJobOffersListDomain) => {
        this.filteredData.data =
          _JobOffersListDomain.jobsOffersListResponse.slice();
      });

    this.store.dispatch(JobOffersPgeActions.getJobOffersList());
  }

  protected navigateToLicenseByIdPage(id: number): void {
    this.router.navigate(['/job-offers', id]);
  }

  openDialog(element: IJobOfferResponse) {
    console.log(element);

    this.dialog.open(JobOfferDetailsComponent, {
      data: element,
    });
  }
}
