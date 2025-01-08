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
import { IJobOfferResponse, IJobOffersState } from 'src/app/shared/models/job-offers-domain.model';

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
        jobOffersListResponse: action.jobOffersListResponse,
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
        jobOffersListResponse: jobOffersListDomain_dto.jobOffersListResponse,
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
  ),
  // Edit job offer by id
  on(
    JobOffersApiActions.editJobOfferByIdSuccess,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        jobOffersListResponse: jobOffersDomainState.jobOffersListDomain.jobOffersListResponse.map((jobOffer: IJobOfferResponse) => ({
          ...jobOffer,
          ...(jobOffer.id === action.editedJobOfferByIdResponse.id && action.editedJobOfferByIdResponse)
        })),
        state: 'success',
        error: null!,
      },
    })
  ),
  // Delete job offer by id 
  on(
    JobOffersApiActions.deleteJobOfferByIdFailure,
    (jobOffersDomainState, action): IJobOffersState => ({
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        state: 'error',
        error: action.error,
      },
    })
  ),
  // Create new job offer
  on(JobOffersApiActions.createJobOfferSuccess, (jobOffersDomainState, action): IJobOffersState => {
    const newJobOffer: IJobOfferResponse = action.createdJobOfferResponse;
    const newJobOffersList: IJobOfferResponse[] = jobOffersDomainState.jobOffersListDomain.jobOffersListResponse;
    newJobOffersList.unshift(newJobOffer);
    return {
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        jobOffersListResponse: newJobOffersList,
        state: 'success',
        error: null!,
      },
    }
  }),
  on(JobOffersApiActions.createJobOfferFailure, (jobOffersDomainState, action): IJobOffersState => {
    return {
      ...jobOffersDomainState,
      jobOffersListDomain: {
        ...jobOffersDomainState.jobOffersListDomain,
        state: 'error',
        error: action.error,
      },
    }
  })
)
