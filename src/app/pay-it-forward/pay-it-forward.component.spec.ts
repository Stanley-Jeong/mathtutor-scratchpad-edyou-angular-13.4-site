import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayItForwardComponent } from './pay-it-forward.component';

describe('PayItForwardComponent', () => {
  let component: PayItForwardComponent;
  let fixture: ComponentFixture<PayItForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayItForwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayItForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
