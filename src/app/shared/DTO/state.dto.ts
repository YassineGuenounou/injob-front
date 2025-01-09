import { IState } from '../models/state.model';
import { interviewsState_dto } from './interviews-domain.dto';
import { jobApplicationsState_dto } from './job-applications-domain.dto';
import { jobOffersState_dto } from './job-offers-domain.dto';

export const initialState_dto: IState = {
  jobOffersState: jobOffersState_dto,
  jobApplicationsState: jobApplicationsState_dto,
  interviewsState: interviewsState_dto

};
