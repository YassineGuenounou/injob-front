import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IJobOfferResponse } from 'src/app/shared/models/jobs-offers-domain.model';

export const JobOffersPgeActions = createActionGroup({
  source: 'Job offers page actions',
  events: {
    'Get job offers list': emptyProps(),
    'Get job offer by id': props<{ jobOfferId: number }>(),
    'Edit job offer by id': props<{
      jobOfferId: number;
      body: IJobOfferResponse;
    }>(),
    'Create job offer': props<{ body: IJobOfferResponse }>(),
  },
});

export const JobOffersApiActions = createActionGroup({
  source: 'Job offers api actions',
  events: {
    // Get job offers
    'Get job offers list success': props<{
      jobOffersListResponse: IJobOfferResponse[];
    }>(),
    'Get job offers list failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Get job by id
    'Get job offer by id success': props<{
      jobOfferByIdResponse: IJobOfferResponse;
    }>(),
    'Get job offer by id failure': props<{ error: HttpErrorResponse }>(),

    // Edit job offer by id
    'Edit job offer by id success': props<{
      editedJobOfferByIdResponse: IJobOfferResponse;
    }>(),
    'Edit job offer by id failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Create job offer
    'Create job offer success': props<{
      createdJobOfferResponse: IJobOfferResponse;
    }>(),
    'Create job offer failure': props<{ error: HttpErrorResponse }>(),
  },
});
