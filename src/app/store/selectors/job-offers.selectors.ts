import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IJobOffersState } from 'src/app/shared/models/jobs-offers-domain.model';

export const jobOffersFeatureSelector =
  createFeatureSelector<IJobOffersState>('jobOffers');

export const getJobOffersListDomain_selector = createSelector(
  jobOffersFeatureSelector,
  (jobOffersState) => jobOffersState.jobOffersListDomain
);

export const getJobOfferByIdDomain_selector = createSelector(
  jobOffersFeatureSelector,
  (jobOffersState) => jobOffersState.jobOfferByIdDomain
);
