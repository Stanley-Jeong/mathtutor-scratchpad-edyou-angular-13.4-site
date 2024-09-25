import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentsuccessComponent } from './consentsuccess.component';

describe('ConsentsuccessComponent', () => {
  let component: ConsentsuccessComponent;
  let fixture: ComponentFixture<ConsentsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
