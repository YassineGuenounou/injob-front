import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDetailsDialogComponent } from './interview-details.dialog.component';

describe('InterviewDetailsDialogComponent', () => {
  let component: InterviewDetailsDialogComponent;
  let fixture: ComponentFixture<InterviewDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewDetailsDialogComponent],
    });
    fixture = TestBed.createComponent(InterviewDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
