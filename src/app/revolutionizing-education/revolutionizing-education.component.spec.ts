import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevolutionizingEducationComponent } from './revolutionizing-education.component';

describe('RevolutionizingEducationComponent', () => {
  let component: RevolutionizingEducationComponent;
  let fixture: ComponentFixture<RevolutionizingEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevolutionizingEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevolutionizingEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
