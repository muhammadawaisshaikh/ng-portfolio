import { TestBed } from '@angular/core/testing';

import { AboutStoreService } from './about.store.service';

describe('AboutStoreService', () => {
  let service: AboutStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
