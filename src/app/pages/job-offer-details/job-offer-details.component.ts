import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IJobOfferByIdDomain,
  IJobOfferResponse,
} from 'src/app/shared/models/jobs-offers-domain.model';
import { JobOffersPgeActions } from 'src/app/store/actions/job-offers.actions';
import { getJobOfferByIdDomain_selector } from 'src/app/store/selectors/job-offers.selectors';

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.scss'],
})
export class JobOfferDetailsComponent implements OnInit {
  jobOfferId!: number;
  jobOfferById!: IJobOfferResponse;
  closed!: string;

  /**
   *
   * @param route
   * @param store
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.jobOfferId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jobOfferId) {
      this.store.dispatch(
        JobOffersPgeActions.getJobOfferById({ jobOfferId: this.jobOfferId })
      );
    }

    this.store
      .select(getJobOfferByIdDomain_selector)
      .subscribe((_jobOfferByIdDomain: IJobOfferByIdDomain) => {
        this.jobOfferById = _jobOfferByIdDomain.jobOfferByIdResponse;
      });

    this.closed = 'closed';
  }

  messageFromChild(checked: any) {
    if (checked) {
      this.closed = 'reopened';
    } else {
      this.closed = 'closed';
    }
  }
}
