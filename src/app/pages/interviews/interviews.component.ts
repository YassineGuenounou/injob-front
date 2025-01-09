import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { IInterviewResponse, IInterviewsListDomain } from "src/app/shared/models/interviewsdomain.model";
import { interviewsPgeActions } from "src/app/store/actions/interviews.actions";
import { getInterviewsListDomain_selector } from "src/app/store/selectors/interviews.selectors";
import { InterviewDetailsDialogComponent } from "./interview-details-dialog/interview-details.dialog.component";


@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit {
  protected readonly filteredData = new MatTableDataSource<IInterviewResponse>();
  protected readonly columns: string[] = [
    'id',
    'date',
    'email',
    'status',
    'description',
    'job application id',
  ];


  constructor(

    public dialog: MatDialog,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.store
      .select(getInterviewsListDomain_selector)
      .subscribe((_InterviewsListDomain: IInterviewsListDomain) => {
        this.filteredData.data =
          _InterviewsListDomain.interviewsListResponse.slice();
      });

    this.store.dispatch(interviewsPgeActions.getInterviewsList());
  }

  openDialog(element: IInterviewResponse) {
    this.dialog.open(InterviewDetailsDialogComponent, {
      data: element
    });
  }

  protected onRowKeyDown(event: KeyboardEvent, interview: IInterviewResponse): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling on Space key
      this.openDialog(interview)
    }
  }
}
