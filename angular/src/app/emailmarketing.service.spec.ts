import { TestBed, inject } from '@angular/core/testing';

import { EmailmarketingService } from './emailmarketing.service';

describe('EmailmarketingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailmarketingService]
    });
  });

  it('should be created', inject([EmailmarketingService], (service: EmailmarketingService) => {
    expect(service).toBeTruthy();
  }));
});
