import { IInterviewByIdDomain, IInterviewResponse, IInterviewsListDomain, IInterviewsState } from "../models/interviewsdomain.model";

export const interviewByIdResponse_dto: IInterviewResponse = {
  id: 0,
  interviewDate: "",
  email: "",
  description: "",
  interviewStatus: "",
  jobApplyId: 0,
  jobDescription: ""
};

export const interviewByIdDomain_dto: IInterviewByIdDomain = {
  interviewByIdResponse: interviewByIdResponse_dto,
  state: '',
  error: null!,
};

export const interviewsListDomain_dto: IInterviewsListDomain = {
  interviewsListResponse: [],
  state: 'empty',
  error: null!,
};

export const interviewsState_dto: IInterviewsState = {
  interviewsListDomain: interviewsListDomain_dto,
  interviewByIdDomain: interviewByIdDomain_dto,
};