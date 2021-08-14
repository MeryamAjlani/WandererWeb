import { TestBed } from '@angular/core/testing';

import { PriceItemsService } from './price-items.service';

describe('PriceItemsService', () => {
  let service: PriceItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
