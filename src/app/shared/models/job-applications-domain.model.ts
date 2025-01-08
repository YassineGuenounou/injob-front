import { HttpErrorResponse } from "@angular/common/http";

export interface IJobApplicationResponse {
    id?: number,
    status: string,
    email: string,
    jobDescription: string,
    date_envoi: string
}


export interface IJobApplicationsListDomain {
    jobApplicationsListResponse: IJobApplicationResponse[];
    state: string;
    error: HttpErrorResponse;
}

export interface IJobApplicationByIdDomain {
    jobApplicationByIdResponse: IJobApplicationResponse;
    state: string;
    error: HttpErrorResponse;
}

export interface IJobApplicationsState {
    jobApplicationsListDomain: IJobApplicationsListDomain;
    jobApplicationByIdDomain: IJobApplicationByIdDomain;
}