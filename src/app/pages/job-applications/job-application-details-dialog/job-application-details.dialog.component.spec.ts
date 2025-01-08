import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationDetailsDialogComponent } from './job-application-details.dialog.component';

describe('JobApplicationDetailsDialogComponent', () => {
  let component: JobApplicationDetailsDialogComponent;
  let fixture: ComponentFixture<JobApplicationDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplicationDetailsDialogComponent],
    });
    fixture = TestBed.createComponent(JobApplicationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
