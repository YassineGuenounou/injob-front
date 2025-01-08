import { IJobApplicationResponse, IJobApplicationByIdDomain, IJobApplicationsListDomain, IJobApplicationsState } from "../models/job-applications-domain.model";

export const jobApplicationByIdResponse_dto: IJobApplicationResponse = {
    id: 0,
    status: "",
    email: "",
    jobDescription: "",
    date_envoi: ""
};

export const jobApplicationByIdDomain_dto: IJobApplicationByIdDomain = {
  jobApplicationByIdResponse: jobApplicationByIdResponse_dto,
  state: '',
  error: null!,
};

export const jobApplicationsListDomain_dto: IJobApplicationsListDomain = {
  jobApplicationsListResponse: [],
  state: 'empty',
  error: null!,
};

export const jobApplicationsState_dto: IJobApplicationsState = {
  jobApplicationsListDomain: jobApplicationsListDomain_dto,
  jobApplicationByIdDomain: jobApplicationByIdDomain_dto,
};
