import { createReducer, on } from '@ngrx/store';
import { interviewByIdDomain_dto, interviewsListDomain_dto, interviewsState_dto } from 'src/app/shared/DTO/interviews-domain.dto';
import { IInterviewResponse, IInterviewsState } from 'src/app/shared/models/interviewsdomain.model';
import { interviewsApiActions, interviewsPgeActions } from '../actions/interviews.actions';

export const interviewsReducers = createReducer<IInterviewsState>(
  interviewsState_dto,
  // Get interviews list
  on(
    interviewsPgeActions.getInterviewsList,
    (interviewsDomainState): IInterviewsState => ({
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        state: 'loading',
        error: null!,
      },
    })
  ),
  on(
    interviewsApiActions.getInterviewsListSuccess,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        interviewsListResponse: action.interviewsListResponse,
        state: 'success',
        error: null!,
      },
    })
  ),
  on(
    interviewsApiActions.getInterviewsListFailure,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        interviewsListResponse: interviewsListDomain_dto.interviewsListResponse,
        state: 'error',
        error: action.error,
      },
    })
  ),
  // Get interview by id
  on(
    interviewsPgeActions.getInterviewById,
    (interviewsDomainState): IInterviewsState => ({
      ...interviewsDomainState,
      interviewByIdDomain: {
        ...interviewsDomainState.interviewByIdDomain,
        state: 'loading',
        error: null!,
      },
    })
  ),
  on(
    interviewsApiActions.getInterviewByIdSuccess,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewByIdDomain: {
        ...interviewsDomainState.interviewByIdDomain,
        interviewByIdResponse: action.interviewByIdResponse,
        state: 'success',
        error: null!,
      },
    })
  ),
  on(
    interviewsApiActions.getInterviewByIdFailure,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewByIdDomain: {
        ...interviewsDomainState.interviewByIdDomain,
        interviewByIdResponse: interviewByIdDomain_dto.interviewByIdResponse,
        state: 'error',
        error: action.error,
      },
    })
  ),
  // Edit interview by id
  on(
    interviewsApiActions.editInterviewByIdSuccess,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        interviewsListResponse: interviewsDomainState.interviewsListDomain.interviewsListResponse.map((interview: IInterviewResponse) => ({
          ...interview,
          ...(interview.id === action.editedInterviewByIdResponse.id && action.editedInterviewByIdResponse)
        })),
        state: 'success',
        error: null!,
      },
    })
  ),
  // Delete interview by id 
  on(
    interviewsApiActions.deleteInterviewByIdFailure,
    (interviewsDomainState, action): IInterviewsState => ({
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        state: 'error',
        error: action.error,
      },
    })
  ),
  // Create new interview
  on(interviewsApiActions.createInterviewSuccess, (interviewsDomainState, action): IInterviewsState => {
    const newinterview: IInterviewResponse = action.createdInterviewResponse;
    const newinterviewsList: IInterviewResponse[] = interviewsDomainState.interviewsListDomain.interviewsListResponse;
    newinterviewsList.unshift(newinterview);
    return {
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        interviewsListResponse: newinterviewsList,
        state: 'success',
        error: null!,
      },
    }
  }),
  on(interviewsApiActions.createInterviewFailure, (interviewsDomainState, action): IInterviewsState => {
    return {
      ...interviewsDomainState,
      interviewsListDomain: {
        ...interviewsDomainState.interviewsListDomain,
        state: 'error',
        error: action.error,
      },
    }
  })
)
