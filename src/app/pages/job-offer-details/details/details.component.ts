import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IJobOfferResponse } from 'src/app/shared/models/jobs-offers-domain.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnChanges {
  @Input() jobOfferById!: IJobOfferResponse;
  @Output() messageToParent = new EventEmitter<boolean>();
  availablesType: string[] = ['STAGE', 'EMPLOI'];

  protected jobOfferByIdFormGroup = new FormGroup({
    id: new FormControl<number>(0),
    description: new FormControl<string>(''),
    publishDate: new FormControl<string>(''),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    type: new FormControl<string>(''),
  });

  constructor(private readonly store: Store) {}

  get jobOfferByIdFormGroupControls(): typeof this.jobOfferByIdFormGroup.controls {
    return this.jobOfferByIdFormGroup.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobOfferById']?.currentValue) {
      this.jobOfferByIdFormGroup.patchValue({
        id: this.jobOfferById.id,
        description: this.jobOfferById.description,
        publishDate: this.jobOfferById.date_publication,
        startDate: this.jobOfferById.date_debut,
        endDate: this.jobOfferById.date_cloture,
        type: this.jobOfferById.type,
      });
    }
  }

  isClosed(event: any) {
    this.messageToParent.emit(event.checked);
  }

  saveChanges() {
    // this.injobService
    //   .putOfferById(this.jobOfferById.id, this.jobOfferById)
    //   .subscribe();
  }
}
