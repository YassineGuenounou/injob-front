import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  IJobOfferResponse,
} from 'src/app/shared/models/jobs-offers-domain.model';
import { JobOffersPgeActions } from 'src/app/store/actions/job-offers.actions';

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.scss'],
})
export class JobOfferDetailsComponent implements OnInit {
  availablesType: string[] = ['STAGE', 'EMPLOI'];

  protected jobOfferByIdFormGroup = new FormGroup({
    id: new FormControl<number>(0),
    description: new FormControl<string>('', Validators.required),
    publishDate: new FormControl<string>('', Validators.required),
    startDate: new FormControl<string>('', Validators.required),
    endDate: new FormControl<string>('', Validators.required),
    type: new FormControl<string>('', Validators.required),
  });

  constructor(
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {
      mode: string,
      jobOffer?: IJobOfferResponse
    },
    private readonly dialogRef: MatDialogRef<JobOfferDetailsComponent>,


  ) { }

  get jobOfferByIdFormGroupControls(): typeof this.jobOfferByIdFormGroup.controls {
    return this.jobOfferByIdFormGroup.controls;
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit-mode') {
      this.jobOfferByIdFormGroup.patchValue({
        id: this.data.jobOffer?.id,
        description: this.data.jobOffer?.description,
        publishDate: this.data.jobOffer?.date_publication,
        startDate: this.data.jobOffer?.date_debut,
        endDate: this.data.jobOffer?.date_cloture,
        type: this.data.jobOffer?.type,
      });
    }
  }

  close(message: string): void {

    if (message === 'submit') {
      if (this.data.mode === 'edit-mode') {

        this.store.dispatch(JobOffersPgeActions.editJobOfferById({
          jobOfferId: this.jobOfferByIdFormGroupControls.id.value!, body: {
            description: this.jobOfferByIdFormGroupControls.description.value!,
            date_publication: this.jobOfferByIdFormGroupControls.publishDate.value!,
            date_cloture: this.jobOfferByIdFormGroupControls.endDate.value!,
            date_debut: this.jobOfferByIdFormGroupControls.startDate.value!,
            type: this.jobOfferByIdFormGroupControls.type.value!
          }
        }))
      }

      if (this.data.mode === 'post-mode') {
        this.store.dispatch(JobOffersPgeActions.createJobOffer({
          body: {
            description: this.jobOfferByIdFormGroupControls.description.value!,
            date_publication: this.jobOfferByIdFormGroupControls.publishDate.value!,
            date_cloture: this.jobOfferByIdFormGroupControls.endDate.value!,
            date_debut: this.jobOfferByIdFormGroupControls.startDate.value!,
            type: this.jobOfferByIdFormGroupControls.type.value!
          }
        }))
      }

    }


    if (message === 'delete' && this.data.mode === 'edit-mode') {
      this.store.dispatch(JobOffersPgeActions.deleteJobOfferById({ jobOfferId: this.data.jobOffer?.id! }))
    }

    this.dialogRef.close();
  }
}
