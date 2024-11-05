import { TestBed } from '@angular/core/testing';

import { GsapGlobalService } from './gsap-global.service';

describe('GsapGlobalService', () => {
  let service: GsapGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsapGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
