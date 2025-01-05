import { createReducer, on } from '@ngrx/store';
import {
  JobOffersApiActions,
  JobOffersPgeActions,
} from '../actions/job-offers.actions';
import {
  jobOfferByIdDomain_dto,
  jobOffersListDomain_dto,
  jobOffersState_dto,
} from 'src/app/shared/DTO/job-offers-domain.dto';
import { IJobOffersState } from 'src/app/shared/models/jobs-offers-domain.model';

export const jobOffersReducers = createReducer<IJobOffersState>(
  jobOffersState_dto,
  // Get job offers list
  on(
    JobOffersPgeActions.getJobOffersList,
    (jobOffersDomainState): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        state: 'loading',
        error: null!,
      },
    })
  ),
  on(
    JobOffersApiActions.getJobOffersListSuccess,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        jobsOffersListResponse: action.jobOffersListResponse,
        state: 'success',
        error: null!,
      },
    })
  ),
  on(
    JobOffersApiActions.getJobOffersListFailure,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        jobsOffersListResponse: jobOffersListDomain_dto.jobsOffersListResponse,
        state: 'error',
        error: action.error,
      },
    })
  ),
  // Get job offer by id
  on(
    JobOffersPgeActions.getJobOfferById,
    (jobOffersDomainState): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOfferByIdDomain: {
        ...jobOffersDomainState.jobOfferByIdDomain,
        state: 'loading',
        error: null!,
      },
    })
  ),
  on(
    JobOffersApiActions.getJobOfferByIdSuccess,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOfferByIdDomain: {
        ...jobOffersDomainState.jobOfferByIdDomain,
        jobOfferByIdResponse: action.jobOfferByIdResponse,
        state: 'success',
        error: null!,
      },
    })
  ),
  on(
    JobOffersApiActions.getJobOfferByIdFailure,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOfferByIdDomain: {
        ...jobOffersDomainState.jobOfferByIdDomain,
        jobOfferByIdResponse: jobOfferByIdDomain_dto.jobOfferByIdResponse,
        state: 'error',
        error: action.error,
      },
    })
  )
);
