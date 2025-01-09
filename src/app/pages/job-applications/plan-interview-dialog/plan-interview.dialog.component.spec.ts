import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInterviewDialogComponent } from './plan-interview.dialog.component';

describe('PlanInterviewDialogComponent', () => {
  let component: PlanInterviewDialogComponent;
  let fixture: ComponentFixture<PlanInterviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanInterviewDialogComponent],
    });
    fixture = TestBed.createComponent(PlanInterviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
