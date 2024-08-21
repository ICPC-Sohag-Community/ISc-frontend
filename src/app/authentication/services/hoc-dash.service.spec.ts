import { TestBed } from '@angular/core/testing';

import { HocDashService } from './hoc-dash.service';

describe('HocDashService', () => {
  let service: HocDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HocDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
