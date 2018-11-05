import { TestBed, inject } from '@angular/core/testing';

import { RssFeedsService } from './rss-feeds.service';

describe('RssFeedsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssFeedsService]
    });
  });

  it('should be created', inject([RssFeedsService], (service: RssFeedsService) => {
    expect(service).toBeTruthy();
  }));
});
