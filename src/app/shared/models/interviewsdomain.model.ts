import { HttpErrorResponse } from '@angular/common/http';

export interface IInterviewResponse {
  id?: number,
  interviewDate: string,
  email: string,
  description: string,
  interviewStatus: string,
  jobApplyId: number,
  jobDescription: string
}

export interface IInterviewsListDomain {
  interviewsListResponse: IInterviewResponse[];
  state: string;
  error: HttpErrorResponse;
}

export interface IInterviewByIdDomain {
  interviewByIdResponse: IInterviewResponse;
  state: string;
  error: HttpErrorResponse;
}

export interface IInterviewsState {
  interviewsListDomain: IInterviewsListDomain;
  interviewByIdDomain: IInterviewByIdDomain;
}

export interface ICreateInterview {
  interviewDate: string,
  description: string
}
