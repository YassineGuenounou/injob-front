import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IJobApplicationResponse, IJobApplicationsListDomain } from 'src/app/shared/models/job-applications-domain.model';
import { JobApplicationsPgeActions } from 'src/app/store/actions/job-applications.actions';
import { getJobApplicationsListDomain_selector } from 'src/app/store/selectors/job-applications.selectors';
import { JobApplicationDetailsDialogComponent } from './job-application-details-dialog/job-application-details.dialog.component';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent {
  protected readonly filteredData = new MatTableDataSource<IJobApplicationResponse>();
  protected readonly columns: string[] = [
    'id',
    'status',
    'email',
    'description',
    'application date',
  ];


  constructor(
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.store
      .select(getJobApplicationsListDomain_selector)
      .subscribe((_JobApplicationsListDomain: IJobApplicationsListDomain) => {
        this.filteredData.data =
          _JobApplicationsListDomain.jobApplicationsListResponse.slice();
      });

    this.store.dispatch(JobApplicationsPgeActions.getJobApplicationsList());
  }

  openDialog(element?: IJobApplicationResponse) {
    this.dialog.open(JobApplicationDetailsDialogComponent, {
      data: element
    });
  }

  protected onRowKeyDown(event: KeyboardEvent, jobOffer: IJobApplicationResponse): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling on Space key
      this.openDialog(jobOffer)
    }
  }
}
