import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IJobApplicationResponse } from "src/app/shared/models/job-applications-domain.model";

export const JobApplicationsPgeActions = createActionGroup({
  source: 'Job applications page actions',
  events: {
    'Get job applications list': emptyProps(),
    'Get job application by id': props<{ jobApplicationId: number }>(),
    'Edit job application by id': props<{
      jobApplicationId: number;
      status: string;
    }>(),
    'Create job application': props<{ id: number }>(),
  },
});

export const JobApplicationsApiActions = createActionGroup({
  source: 'Job applications api actions',
  events: {
    // Get job applications
    'Get job applications list success': props<{
      jobApplicationsListResponse: IJobApplicationResponse[];
    }>(),
    'Get job applications list failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Get job by id
    'Get job application by id success': props<{
      jobApplicationByIdResponse: IJobApplicationResponse;
    }>(),
    'Get job application by id failure': props<{ error: HttpErrorResponse }>(),

    // Edit job application by id
    'Edit job application by id success': props<{
      editedJobApplicationByIdResponse: IJobApplicationResponse;
    }>(),
    'Edit job application by id failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Create job application
    'Create job application success': props<{
      createdJobApplicationResponse: IJobApplicationResponse;
    }>(),
    'Create job application failure': props<{ error: HttpErrorResponse }>(),
  },
});
