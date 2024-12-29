import { Component, EventEmitter, Input, Output } from '@angular/core';
import { injobService } from 'src/app/services/job-offers.service';
import { IJobOffers } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() jobOfferById!: IJobOffers;
  @Output() messageToParent = new EventEmitter<boolean>();

  constructor(private readonly injobService: injobService) {}

  isClosed(event: any) {
    this.messageToParent.emit(event.checked);
  }

  saveChanges() {
    this.injobService
      .putOfferById(this.jobOfferById.id, this.jobOfferById)
      .subscribe();
  }
}
