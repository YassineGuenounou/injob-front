import { IJobApplicationsState } from './job-applications-domain.model';
import { IJobOffersState } from './job-offers-domain.model';

export interface IState {
  jobOffersState: IJobOffersState;
  jobApplicationsState: IJobApplicationsState;
}
