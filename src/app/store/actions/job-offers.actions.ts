import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IJobOfferResponse } from 'src/app/shared/models/jobs-offers-domain.model';

export const JobOffersPgeActions = createActionGroup({
  source: 'Job offers page actions',
  events: {
    'Get all job offers': emptyProps(),
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
    // Get all job offers
    'Get all job offers success': props<{
      jobOffersListResponse: IJobOfferResponse[];
    }>(),
    'Get all job offers failure': props<{
      error: HttpErrorResponse;
    }>(),

    // Get job by id
    'Get job offer by id success': props<{
      jobOfferResponse: IJobOfferResponse;
    }>(),
    'Get job offer by id failure': props<{ error: HttpErrorResponse }>(),

    // Edit job offer by id
    'Edit job offer by id success': props<{
      editedJobOfferResponse: IJobOfferResponse;
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
