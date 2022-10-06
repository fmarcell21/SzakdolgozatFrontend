import { TestBed } from '@angular/core/testing';

import { PopularmoviesService } from './popularmovies.service';

describe('PopularmoviesService', () => {
  let service: PopularmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
