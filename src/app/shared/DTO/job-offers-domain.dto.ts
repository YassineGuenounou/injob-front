import {
  IJobOfferByIdDomain,
  IJobOfferResponse,
  IJobOffersListDomain,
  IJobOffersState,
} from '../models/job-offers-domain.model';

export const jobOfferByIdResponse_dto: IJobOfferResponse = {
  id: 0,
  description: '',
  date_publication: '',
  date_cloture: '',
  date_debut: '',
  type: '',
};

export const jobOfferByIdDomain_dto: IJobOfferByIdDomain = {
  jobOfferByIdResponse: jobOfferByIdResponse_dto,
  state: '',
  error: null!,
};

export const jobOffersListDomain_dto: IJobOffersListDomain = {
  jobOffersListResponse: [],
  state: 'empty',
  error: null!,
};

export const jobOffersState_dto: IJobOffersState = {
  jobOffersListDomain: jobOffersListDomain_dto,
  jobOfferByIdDomain: jobOfferByIdDomain_dto,
};
