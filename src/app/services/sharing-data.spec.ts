import { TestBed } from '@angular/core/testing';

import { SharingData } from './sharing-data';

describe('SharingData', () => {
  let service: SharingData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
