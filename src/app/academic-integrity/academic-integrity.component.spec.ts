import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicIntegrityComponent } from './academic-integrity.component';

describe('AcademicIntegrityComponent', () => {
  let component: AcademicIntegrityComponent;
  let fixture: ComponentFixture<AcademicIntegrityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicIntegrityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicIntegrityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
