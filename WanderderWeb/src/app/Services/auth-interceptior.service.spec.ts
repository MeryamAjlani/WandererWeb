import { TestBed } from '@angular/core/testing';

import { AuthInterceptiorService } from './auth-interceptior.service';

describe('AuthInterceptiorService', () => {
  let service: AuthInterceptiorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptiorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
