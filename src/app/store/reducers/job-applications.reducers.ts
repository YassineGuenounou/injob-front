import { createReducer, on } from '@ngrx/store';
import { jobApplicationByIdDomain_dto, jobApplicationsListDomain_dto, jobApplicationsState_dto } from 'src/app/shared/DTO/job-applications-domain.dto';
import { IJobApplicationResponse, IJobApplicationsState } from 'src/app/shared/models/job-applications-domain.model';
import { JobApplicationsApiActions, JobApplicationsPgeActions } from '../actions/job-applications.actions';

export const jobApplicationsReducers = createReducer<IJobApplicationsState>(
    jobApplicationsState_dto,
    // Get job applications list
    on(
        JobApplicationsPgeActions.getJobApplicationsList,
        (jobApplicationsDomainState): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                state: 'loading',
                error: null!,
            },
        })
    ),
    on(
        JobApplicationsApiActions.getJobApplicationsListSuccess,
        (jobApplicationsDomainState, action): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                jobApplicationsListResponse: action.jobApplicationsListResponse,
                state: 'success',
                error: null!,
            },
        })
    ),
    on(
        JobApplicationsApiActions.getJobApplicationsListFailure,
        (jobApplicationsDomainState, action): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                jobApplicationsListResponse: jobApplicationsListDomain_dto.jobApplicationsListResponse,
                state: 'error',
                error: action.error,
            },
        })
    ),
    // Get job application by id
    on(
        JobApplicationsPgeActions.getJobApplicationById,
        (jobApplicationsDomainState): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationByIdDomain: {
                ...jobApplicationsDomainState.jobApplicationByIdDomain,
                state: 'loading',
                error: null!,
            },
        })
    ),
    on(
        JobApplicationsApiActions.getJobApplicationByIdSuccess,
        (jobApplicationsDomainState, action): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationByIdDomain: {
                ...jobApplicationsDomainState.jobApplicationByIdDomain,
                jobApplicationByIdResponse: action.jobApplicationByIdResponse,
                state: 'success',
                error: null!,
            },
        })
    ),
    on(
        JobApplicationsApiActions.getJobApplicationByIdFailure,
        (jobApplicationsDomainState, action): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationByIdDomain: {
                ...jobApplicationsDomainState.jobApplicationByIdDomain,
                jobApplicationByIdResponse: jobApplicationByIdDomain_dto.jobApplicationByIdResponse,
                state: 'error',
                error: action.error,
            },
        })
    ),

    // Edit job application by id
    on(
        JobApplicationsApiActions.editJobApplicationByIdSuccess,
        (jobApplicationsDomainState, action): IJobApplicationsState => ({
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                jobApplicationsListResponse: jobApplicationsDomainState.jobApplicationsListDomain.jobApplicationsListResponse.map((jobApplication: IJobApplicationResponse) => ({
                    ...jobApplication,
                    ...(jobApplication.id === action.editedJobApplicationByIdResponse.id && action.editedJobApplicationByIdResponse)
                })),
                state: 'success',
                error: null!,
            },
        })
    ),

    // Create new job application
    on(JobApplicationsApiActions.createJobApplicationSuccess, (jobApplicationsDomainState, action): IJobApplicationsState => {
        const newJobApplication: IJobApplicationResponse = action.createdJobApplicationResponse;
        const newJobApplicationsList: IJobApplicationResponse[] = jobApplicationsDomainState.jobApplicationsListDomain.jobApplicationsListResponse;
        newJobApplicationsList.unshift(newJobApplication);
        return {
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                jobApplicationsListResponse: newJobApplicationsList,
                state: 'success',
                error: null!,
            },
        }
    }),
    on(JobApplicationsApiActions.createJobApplicationFailure, (jobApplicationsDomainState, action): IJobApplicationsState => {
        return {
            ...jobApplicationsDomainState,
            jobApplicationsListDomain: {
                ...jobApplicationsDomainState.jobApplicationsListDomain,
                state: 'error',
                error: action.error,
            },
        }
    })
)
