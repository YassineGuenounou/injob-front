import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IInterviewsState } from 'src/app/shared/models/interviewsdomain.model';

export const interviewsFeatureSelector =
  createFeatureSelector<IInterviewsState>('interviews');

export const getInterviewsListDomain_selector = createSelector(
  interviewsFeatureSelector,
  (interviewsState) => interviewsState.interviewsListDomain
);

export const getInterviewByIdDomain_selector = createSelector(
  interviewsFeatureSelector,
  (interviewsState) => interviewsState.interviewByIdDomain
);
