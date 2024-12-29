import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobOffersService } from 'src/app/services/job-offers.service';
import { IJobOfferResponse } from 'src/app/shared/models/jobs-offers-domain.model';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
})
export class JobOffersComponent implements OnInit {
  protected readonly filteredData = new MatTableDataSource<IJobOfferResponse>();
  protected readonly columns: string[] = [
    'id',
    'type',
    'description',
    'publish',
    'edit',
  ];

  sub!: Subscription;

  constructor(
    private readonly jobOffersService: JobOffersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.sub = this.jobOffersService
      .getAllJobOffers()
      .subscribe((res) => (this.filteredData.data = res.slice()!));
  }

  protected navigateToLicenseByIdPage(id: number): void {
    this.router.navigate(['/job-offers', id]);
  }
}
