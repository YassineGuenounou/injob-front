import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import { IInterviewResponse } from 'src/app/shared/models/interviewsdomain.model';
import { interviewsPgeActions } from 'src/app/store/actions/interviews.actions';

@Component({
  selector: 'app-interview-details-dialog',
  templateUrl: './interview-details.dialog.component.html',
  styleUrls: ['./interview-details.dialog.component.scss'],
})
export class InterviewDetailsDialogComponent implements OnInit {
  availablesStatus: string[] = ['PLANNED', 'DONE', 'CANCELED'];
  keycloakInstance!: KeycloakInstance;
  isAdmin!: boolean;
  isUser!: boolean;


  protected interviewByIdFormGroup = new FormGroup({
    id: new FormControl<number>(0),
    status: new FormControl<string>(''),
    date: new FormControl<string>(''),
    email: new FormControl<string>(''),
    jobApplicationId: new FormControl<number>(0),
    description: new FormControl<string>(''),
  });

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: IInterviewResponse,

    private readonly dialogRef: MatDialogRef<InterviewDetailsDialogComponent>,


  ) { }

  get interviewByIdFormGroupControls(): typeof this.interviewByIdFormGroup.controls {
    return this.interviewByIdFormGroup.controls;
  }

  ngOnInit(): void {
    this.keycloakInstance = this.keycloakService.getKeycloakInstance()
    this.isAdmin = this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('admin')
    this.isUser = this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('user') && !this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('admin')

    this.interviewByIdFormGroup.patchValue({
      id: this.data.id,
      status: this.data.interviewStatus,
      description: this.data.description,
      date: this.data.interviewDate,
      email: this.data.email,
      jobApplicationId: this.data.jobApplyId,
    });

    this.interviewByIdFormGroup.disable()

    if (this.isAdmin) {
      this.interviewByIdFormGroup.controls.status.enable()
    }

  }

  submit(): void {
    this.store.dispatch(interviewsPgeActions.editInterviewById({
      interviewId: this.interviewByIdFormGroupControls.id.value!,
      status: this.interviewByIdFormGroupControls.status.value!
    }))

    this.dialogRef.close();
  }

  delete() {
    this.store.dispatch(interviewsPgeActions.deleteInterviewById({ interviewId: this.data.id! }))
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
