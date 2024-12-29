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
  ) {}

  getAllJobOffers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobOffersPgeActions.getAllJobOffers),
      mergeMap(() =>
        this.jobOffersService.getAllJobOffers().pipe(
          map((jobOffersListResponse: IJobOfferResponse[]) =>
            JobOffersApiActions.getAllJobOffersSuccess({
              jobOffersListResponse,
            })
          ),
          catchError((error) =>
            of(JobOffersApiActions.getAllJobOffersFailure({ error }))
          )
        )
      )
    );
  });
}
