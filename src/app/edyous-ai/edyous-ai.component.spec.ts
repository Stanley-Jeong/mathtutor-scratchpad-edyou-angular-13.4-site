import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdyousAiComponent } from './edyous-ai.component';

describe('EdyousAiComponent', () => {
  let component: EdyousAiComponent;
  let fixture: ComponentFixture<EdyousAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdyousAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdyousAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
