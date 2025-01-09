import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { InterviewsService } from 'src/app/services/interviews.service';
import { interviewsApiActions, interviewsPgeActions } from '../actions/interviews.actions';
import { IInterviewResponse } from 'src/app/shared/models/interviewsdomain.model';

@Injectable()
export class InterviewsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly interviewsService: InterviewsService
  ) { }

  getInterviewsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(interviewsPgeActions.getInterviewsList),
      mergeMap(() =>
        this.interviewsService.getInterviewsList().pipe(
          map((interviewsListResponse: IInterviewResponse[]) =>
            interviewsApiActions.getInterviewsListSuccess({ 
              interviewsListResponse
            })
          ),
          catchError((error) =>
            of(interviewsApiActions.getInterviewsListFailure({ error }))
          )
        )
      )
    );
  });

  getInterviewById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(interviewsPgeActions.getInterviewById),
      mergeMap((action) =>
        this.interviewsService.getInterviewById(action.interviewId).pipe(
          map((interviewByIdResponse: IInterviewResponse) =>
            interviewsApiActions.getInterviewByIdSuccess({
              interviewByIdResponse,
            })
          ),
          catchError((error) =>
            of(interviewsApiActions.getInterviewByIdFailure({ error }))
          )
        )
      )
    );
  });

  editInterviewById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(interviewsPgeActions.editInterviewById),
      mergeMap((action) =>
        this.interviewsService.editInterviewById(action.interviewId, action.status).pipe(
          map((InterviewByIdResponse: IInterviewResponse) =>
            interviewsApiActions.editInterviewByIdSuccess({
              editedInterviewByIdResponse: InterviewByIdResponse,
            })
          ),
          catchError((error) =>
            of(interviewsApiActions.editInterviewByIdFailure({ error }))
          )
        )
      )
    );
  });

  deleteInterviewById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(interviewsPgeActions.deleteInterviewById),
      mergeMap((action) =>
        this.interviewsService.deleteInterviewById(action.interviewId).pipe(
          map(() => {
             window.location.reload()
           return interviewsApiActions.deleteInterviewByIdSuccess()
          }),
          catchError((error) =>
            of(interviewsApiActions.deleteInterviewByIdFailure({ error }))
          )
        )
      )
    );
  });

  createNewInterview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(interviewsPgeActions.createInterview),
      mergeMap((action) =>
        this.interviewsService.createNewInterview(action.jobApplicationId, action.body).pipe(
          map((interviewByIdResponse: IInterviewResponse) =>
            interviewsApiActions.createInterviewSuccess({
              createdInterviewResponse: interviewByIdResponse,
            })
          ),
          catchError((error) =>
            of(interviewsApiActions.createInterviewFailure({ error }))
          )
        )
      )
    );
  });
}
