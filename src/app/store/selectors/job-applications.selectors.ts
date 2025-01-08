import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IJobApplicationsState } from "src/app/shared/models/job-applications-domain.model";

export const jobApplicationsFeatureSelector =
  createFeatureSelector<IJobApplicationsState>('jobApplications');

export const getJobApplicationsListDomain_selector = createSelector(
  jobApplicationsFeatureSelector,
  (jobApplicationsState) => jobApplicationsState.jobApplicationsListDomain
);

export const getJobApplicationByIdDomain_selector = createSelector(
  jobApplicationsFeatureSelector,
  (jobApplicationsState) => jobApplicationsState.jobApplicationByIdDomain
);
