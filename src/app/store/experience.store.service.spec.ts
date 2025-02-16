import { TestBed } from '@angular/core/testing';

import { ExperienceStoreService } from './experience.store.service';

describe('ExperienceStoreService', () => {
  let service: ExperienceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
