import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import { IJobApplicationResponse } from 'src/app/shared/models/job-applications-domain.model';
import { JobApplicationsPgeActions } from 'src/app/store/actions/job-applications.actions';

@Component({
  selector: 'app-job-application-details-dialog',
  templateUrl: './job-application-details.dialog.component.html',
  styleUrls: ['./job-application-details.dialog.component.scss'],
})
export class JobApplicationDetailsDialogComponent implements OnInit {
  availablesStatus: string[] = ['ACCEPTED', 'PENDING', 'REJECTED'];
  keycloakInstance!: KeycloakInstance;
  isAdmin!: boolean;
  isUser!: boolean;


  protected jobApplicationByIdFormGroup = new FormGroup({
    id: new FormControl<number>(0),
    status: new FormControl<string>(''),
    applicationDate: new FormControl<string>(''),
    description: new FormControl<string>(''),
    email: new FormControl<string>(''),
  });

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: IJobApplicationResponse,
    private readonly dialogRef: MatDialogRef<JobApplicationDetailsDialogComponent>,


  ) { }

  get jobApplicationByIdFormGroupControls(): typeof this.jobApplicationByIdFormGroup.controls {
    return this.jobApplicationByIdFormGroup.controls;
  }

  ngOnInit(): void {
    this.keycloakInstance = this.keycloakService.getKeycloakInstance()
    this.isAdmin = this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('admin')
    this.isUser = this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('user') && !this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('admin')

    this.jobApplicationByIdFormGroup.patchValue({
      id: this.data?.id,
      description: this.data?.jobDescription,
      applicationDate: this.data?.date_envoi,
      email: this.data?.email,
      status: this.data?.status,
    });

    this.jobApplicationByIdFormGroup.disable()

    if (this.isAdmin) {
      this.jobApplicationByIdFormGroupControls.status.enable()
    }

  }

  submit(): void {
    this.store.dispatch(JobApplicationsPgeActions.editJobApplicationById({
      jobApplicationId: this.jobApplicationByIdFormGroupControls.id.value!,
      status: this.jobApplicationByIdFormGroupControls.status.value!
    }))

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();

  }
}
