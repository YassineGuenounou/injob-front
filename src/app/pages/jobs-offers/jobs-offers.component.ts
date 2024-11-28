import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { injobService } from 'src/app/services/injob.service';
import { IJobOffers } from 'src/app/shared/models/joboffers.model';

@Component({
  selector: 'app-jobs-offers',
  templateUrl: './jobs-offers.component.html',
  styleUrls: ['./jobs-offers.component.scss'],
})
export class JobsOffersComponent implements OnInit {
  protected readonly filteredData = new MatTableDataSource<IJobOffers>();
  protected readonly columns: string[] = [
    'id',
    'type',
    'description',
    'publish',
    'edit',
  ];

  sub!: Subscription;

  constructor(
    private readonly injobService: injobService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.sub = this.injobService
      .listJobOffers()
      .subscribe((res) => (this.filteredData.data = res.slice()!));
  }

  protected navigateToLicenseByIdPage(id: number): void {
    this.router.navigate(['/jobs-offers', id]);
  }
}
