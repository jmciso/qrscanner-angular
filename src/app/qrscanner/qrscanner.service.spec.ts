import { TestBed } from '@angular/core/testing';

import { QrScannerService } from './qrscanner.service';

describe('QrScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrScannerService = TestBed.get(QrScannerService);
    expect(service).toBeTruthy();
  });
});
