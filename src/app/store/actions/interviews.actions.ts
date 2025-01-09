import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateInterview, IInterviewResponse } from 'src/app/shared/models/interviewsdomain.model';

export const interviewsPgeActions = createActionGroup({
  source: 'Interviews page actions',
  events: {
    'Get interviews list': emptyProps(),
    'Get interview by id': props<{ interviewId: number }>(),
    'Edit interview by id': props<{
      interviewId: number;
      status: string;
    }>(),
    'Create interview': props<{
      jobApplicationId: number, body: ICreateInterview
    }>(),
    'Delete interview by id': props<{ interviewId: number }>(),
  },
});

export const interviewsApiActions = createActionGroup({
  source: 'Interviews api actions',
  events: {
    // Get interviews list
    'Get interviews list success': props<{
      interviewsListResponse: IInterviewResponse[];
    }>(),
    'Get interviews list failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Get interview by id
    'Get interview by id success': props<{
      interviewByIdResponse: IInterviewResponse;
    }>(),
    'Get interview by id failure': props<{ error: HttpErrorResponse }>(),

    // Edit interview by id
    'Edit interview by id success': props<{
      editedInterviewByIdResponse: IInterviewResponse;
    }>(),
    'Edit interview by id failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Create interview
    'Create interview success': props<{
      createdInterviewResponse: IInterviewResponse;
    }>(),
    'Create interview failure': props<{ error: HttpErrorResponse }>(),
    // Delete interview by id
    'Delete interview by id success': emptyProps(),
    'Delete interview by id failure': props<{ error: HttpErrorResponse }>(),
  },
});
