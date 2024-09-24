import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScComponent } from './course-sc.component';

describe('CourseScComponent', () => {
  let component: CourseScComponent;
  let fixture: ComponentFixture<CourseScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseScComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
