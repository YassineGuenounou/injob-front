import { HttpErrorResponse } from '@angular/common/http';

export interface IJobOfferResponse {
  id?: number;
  description: string;
  date_publication: string;
  date_cloture: string;
  date_debut: string;
  type: string;
}

export interface IJobOffersListDomain {
  jobOffersListResponse: IJobOfferResponse[];
  state: string;
  error: HttpErrorResponse;
}

export interface IJobOfferByIdDomain {
  jobOfferByIdResponse: IJobOfferResponse;
  state: string;
  error: HttpErrorResponse;
}

export interface IJobOffersState {
  jobOffersListDomain: IJobOffersListDomain;
  jobOfferByIdDomain: IJobOfferByIdDomain;
}
