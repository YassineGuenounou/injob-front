import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobApplicationsService } from "src/app/services/job-applications.service";
import { JobApplicationsApiActions, JobApplicationsPgeActions } from "../actions/job-applications.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { IJobApplicationResponse } from "src/app/shared/models/job-applications-domain.model";

@Injectable()
export class JobApplicationsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly jobApplicationsService: JobApplicationsService
  ) { }

  getJobApplicationsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobApplicationsPgeActions.getJobApplicationsList),
      mergeMap(() =>
        this.jobApplicationsService.getJobApplicationsList().pipe(
          map((jobApplicationsListResponse: IJobApplicationResponse[]) =>
            JobApplicationsApiActions.getJobApplicationsListSuccess({
              jobApplicationsListResponse,
            })
          ),
          catchError((error) =>
            of(JobApplicationsApiActions.getJobApplicationsListFailure({ error }))
          )
        )
      )
    );
  });

  getJobApplicationById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobApplicationsPgeActions.getJobApplicationById),
      mergeMap((action) =>
        this.jobApplicationsService.getJobApplicationById(action.jobApplicationId).pipe(
          map((jobApplicationByIdResponse: IJobApplicationResponse) =>
            JobApplicationsApiActions.getJobApplicationByIdSuccess({
              jobApplicationByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobApplicationsApiActions.getJobApplicationByIdFailure({ error }))
          )
        )
      )
    );
  });

  editJobApplicationById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobApplicationsPgeActions.editJobApplicationById),
      mergeMap((action) =>
        this.jobApplicationsService.editJobApplicationById(action.jobApplicationId, action.status).pipe(
          map((jobApplicationByIdResponse: IJobApplicationResponse) =>
            JobApplicationsApiActions.editJobApplicationByIdSuccess({
              editedJobApplicationByIdResponse: jobApplicationByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobApplicationsApiActions.editJobApplicationByIdFailure({ error }))
          )
        )
      )
    );
  });

  createNewJobApplication$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobApplicationsPgeActions.createJobApplication),
      mergeMap((action) =>
        this.jobApplicationsService.createNewJobApplication(action.id).pipe(
          map((jobApplicationByIdResponse: IJobApplicationResponse) =>
            JobApplicationsApiActions.createJobApplicationSuccess({
              createdJobApplicationResponse: jobApplicationByIdResponse,
            })
          ),
          catchError((error) =>
            of(JobApplicationsApiActions.createJobApplicationFailure({ error }))
          )
        )
      )
    );
  });
}
