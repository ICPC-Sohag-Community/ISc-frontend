import { TestBed } from '@angular/core/testing';

import { SetpassService } from './setpass.service';

describe('SetpassService', () => {
  let service: SetpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
