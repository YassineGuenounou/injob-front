import { Component, Inject,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { interviewsPgeActions } from 'src/app/store/actions/interviews.actions';

@Component({
  selector: 'app-plan-interview-dialog',
  templateUrl: './plan-interview.dialog.component.html',
  styleUrls: ['./plan-interview.dialog.component.scss'],
})
export class PlanInterviewDialogComponent {

  protected planInterviewFormGroup = new FormGroup({
    date: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
  });

  constructor(
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {
      jobApplicationId: number,
      jobDescription: string
    },
    private readonly dialogRef: MatDialogRef<PlanInterviewDialogComponent>,


  ) { }

  get planInterviewFormGroupControls(): typeof this.planInterviewFormGroup.controls {
    return this.planInterviewFormGroup.controls;
  }

  

  submit(): void {
    this.store.dispatch(interviewsPgeActions.createInterview({
      jobApplicationId: this.data.jobApplicationId,
      body: {
        interviewDate: this.planInterviewFormGroupControls.date.value!,
        description: this.data.jobDescription,
      }
    }))

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();

  }
}
