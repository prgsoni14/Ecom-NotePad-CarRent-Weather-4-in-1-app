import { TestBed } from '@angular/core/testing';

import { CredService } from './cred.service';

describe('CredService', () => {
  let service: CredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
