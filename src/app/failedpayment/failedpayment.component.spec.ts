import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedpaymentComponent } from './failedpayment.component';

describe('FailedpaymentComponent', () => {
  let component: FailedpaymentComponent;
  let fixture: ComponentFixture<FailedpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
