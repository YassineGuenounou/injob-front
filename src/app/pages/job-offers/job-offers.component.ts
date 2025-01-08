import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IJobOfferResponse,
  IJobOffersListDomain,
} from 'src/app/shared/models/job-offers-domain.model';
import { JobOffersPgeActions } from 'src/app/store/actions/job-offers.actions';
import { getJobOffersListDomain_selector } from 'src/app/store/selectors/job-offers.selectors';
import { JobOfferDetailsComponent } from './job-offer-details-dialog/job-offer-details.component';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit {
  isAdmin!: boolean;
  keycloakInstance!: KeycloakInstance;

  protected readonly filteredData = new MatTableDataSource<IJobOfferResponse>();
  protected readonly columns: string[] = [
    'id',
    'type',
    'description',
    'publish',
    'start date',
    'end date',
  ];


  constructor(
    private readonly keycloakService: KeycloakService,

    public dialog: MatDialog,
    private readonly router: Router,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.keycloakInstance = this.keycloakService.getKeycloakInstance()
    this.isAdmin = this.keycloakInstance.resourceAccess!['spring_client'].roles.includes('admin')
    this.store
      .select(getJobOffersListDomain_selector)
      .subscribe((_JobOffersListDomain: IJobOffersListDomain) => {
        this.filteredData.data =
          _JobOffersListDomain.jobOffersListResponse.slice();
      });

    this.store.dispatch(JobOffersPgeActions.getJobOffersList());
  }

  openDialog(mode: string, element?: IJobOfferResponse) {
    this.dialog.open(JobOfferDetailsComponent, {
      data: {
        mode: mode,
        jobOffer: element
      },
    });
  }

  protected onRowKeyDown(event: KeyboardEvent, jobOffer: IJobOfferResponse): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling on Space key
      this.openDialog('edit-mode', jobOffer)
    }
  }
}
