import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { JobOffersService } from 'src/app/services/job-offers.service';
import { IJobOfferResponse } from 'src/app/shared/models/jobs-offers-domain.model';
import {
  JobOffersApiActions,
  JobOffersPgeActions,
} from '../actions/job-offers.actions';

@Injectable()
export class JobsOffersEffects {
  /**
   *
   * @param actions$
   * @param jobOffersService
   */
  constructor(
    private readonly actions$: Actions,
    private readonly jobOffersService: JobOffersService
  ) { }

  getJobOffersList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.getJobOffersList),
      mergeMap(() =>
        this.jobOffersService.getJobOffersList().pipe(
          map((jobOffersListResponse: IJobOfferResponse[]) =>
            JobOffersApiActions.getJobOffersListSuccess({
              jobOffersListResponse,
            })
          ),
          catchError((error) =>
            of(JobOffersApiActions.getJobOffersListFailure({ error }))
          )
        )
      )
    );
  });

  getJobOfferById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.getJobOfferById),
      mergeMap((action) =>
        this.jobOffersService.getJobOfferById(action.jobOfferId).pipe(
          map((jobOfferByIdResponse: IJobOfferResponse) =>
            JobOffersApiActions.getJobOfferByIdSuccess({
              jobOfferByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobOffersApiActions.getJobOfferByIdFailure({ error }))
          )
        )
      )
    );
  });

  editJobOfferById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.editJobOfferById),
      mergeMap((action) =>
        this.jobOffersService.editJobOfferById(action.jobOfferId, action.body).pipe(
          map((jobOfferByIdResponse: IJobOfferResponse) =>
            JobOffersApiActions.editJobOfferByIdSuccess({
              editedJobOfferByIdResponse: jobOfferByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobOffersApiActions.editJobOfferByIdFailure({ error }))
          )
        )
      )
    );
  });

  deleteJobOfferById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.deleteJobOfferById),
      mergeMap((action) =>
        this.jobOffersService.deleteJobOfferById(action.jobOfferId).pipe(
          map(() => {
             window.location.reload()
           return JobOffersApiActions.deleteJobOfferByIdSuccess()
          }),
          catchError((error) =>
            of(JobOffersApiActions.deleteJobOfferByIdFailure({ error }))
          )
        )
      )
    );
  });

  createNewJobOffer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.createJobOffer),
      mergeMap((action) =>
        this.jobOffersService.createNewJobOffer(action.body).pipe(
          map((jobOfferByIdResponse: IJobOfferResponse) =>
            JobOffersApiActions.createJobOfferSuccess({
              createdJobOfferResponse: jobOfferByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobOffersApiActions.createJobOfferFailure({ error }))
          )
        )
      )
    );
  });
}
