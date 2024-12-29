import { createReducer, on } from '@ngrx/store';
import { initialState_dto } from 'src/app/shared/DTO/state.dto';
import {
  JobOffersApiActions,
  JobOffersPgeActions,
} from '../actions/job-offers.actions';
import { IState } from 'src/app/shared/models/state.model';

export const jobOffersReducers = createReducer(
  initialState_dto,
  on(
    JobOffersPgeActions.getAllJobOffers,
    (state): IState => ({
      ...state,
      jobOffersDomain: {
        ...state.jobOffersDomain,
        jobOffersListDomain: {
          ...state.jobOffersDomain.jobOffersListDomain,
          state: 'loading',
          error: null!,
        },
      },
    })
  ),
  on(
    JobOffersApiActions.getAllJobOffersSuccess,
    (state, action): IState => ({
      ...state,
      jobOffersDomain: {
        ...state.jobOffersDomain,
        jobOffersListDomain: {
          ...state.jobOffersDomain.jobOffersListDomain,
          jobsOffersListResponse: action.jobOffersListResponse,
          state: 'success',
          error: null!,
        },
      },
    })
  )
);
