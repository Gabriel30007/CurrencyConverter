import { TestBed } from '@angular/core/testing';

import { CurrencyRateServiceService } from './currency-rate-service.service';

describe('CurrencyRateServiceService', () => {
  let service: CurrencyRateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyRateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
