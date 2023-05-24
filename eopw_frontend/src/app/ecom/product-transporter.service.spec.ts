import { TestBed } from '@angular/core/testing';

import { ProductTransporterService } from './product-transporter.service';

describe('ProductTransporterService', () => {
  let service: ProductTransporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTransporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
