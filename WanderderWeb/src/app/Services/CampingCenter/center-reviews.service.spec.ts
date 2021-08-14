import { TestBed } from '@angular/core/testing';

import { CenterReviewsService } from './center-reviews.service';

describe('CenterReviewsService', () => {
  let service: CenterReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
