import { TestBed } from '@angular/core/testing';

import { ScRedirectGuard } from './sc-redirect.guard';

describe('ScRedirectGuard', () => {
  let guard: ScRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScRedirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
