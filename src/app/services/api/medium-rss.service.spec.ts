import { TestBed } from '@angular/core/testing';

import { MediumRssService } from './medium-rss.service';

describe('MediumRssService', () => {
  let service: MediumRssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediumRssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
