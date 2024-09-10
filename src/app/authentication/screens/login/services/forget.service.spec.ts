import { TestBed } from '@angular/core/testing';

import { ForgetService } from './forget.service';

describe('ForgetService', () => {
  let service: ForgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
