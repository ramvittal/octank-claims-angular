import { TestBed } from '@angular/core/testing';

import { ClaimsApiService } from './claims-api.service';

describe('ClaimsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimsApiService = TestBed.get(ClaimsApiService);
    expect(service).toBeTruthy();
  });
});
