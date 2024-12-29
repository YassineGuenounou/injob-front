import {
  IJobOfferByIdDomain,
  IJobOfferResponse,
  IJobOffersDomain,
  IJobOffersListDomain,
} from '../models/jobs-offers-domain.model';

export const jobOfferByIdResponse_dto: IJobOfferResponse = {
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
  jobsOffersListResponse: [],
  state: 'empty',
  error: null!,
};

export const jobOffersDomain_dto: IJobOffersDomain = {
  jobOffersListDomain: jobOffersListDomain_dto,
  jobOfferByIdDomain: jobOfferByIdDomain_dto,
};