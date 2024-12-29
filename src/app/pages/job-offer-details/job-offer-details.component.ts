import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { injobService } from 'src/app/services/job-offers.service';
import { IJobOffers } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.scss'],
})
export class JobOfferDetailsComponent implements OnInit {
  sub!: Subscription;
  jobOfferId!: number;
  jobOfferById!: IJobOffers;
  closed!: string;

  constructor(
    private readonly injobService: injobService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.jobOfferId = Number(this.route.snapshot.paramMap.get('id'));
    this.closed = 'closed';
    this.sub = this.injobService
      .getJobOfferById(this.jobOfferId)
      .subscribe(
        (jobOfferById: IJobOffers) => (this.jobOfferById = jobOfferById)
      );
  }

  messageFromChild(checked: any) {
    if (checked) {
      this.closed = 'reopened';
    } else {
      this.closed = 'closed';
    }
  }
}
