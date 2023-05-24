import { TestBed } from '@angular/core/testing';

import { PastriesService } from './pastries.service';

describe('PastriesService', () => {
  let service: PastriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
