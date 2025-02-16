import { TestBed } from '@angular/core/testing';

import { ProjectsStoreService } from './projects.store.service';

describe('ProjectsStoreService', () => {
  let service: ProjectsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
