import { QRScannerModule } from './qrscanner.module';

describe('QRScannerModule', () => {
  let qRScannerModule: QRScannerModule;

  beforeEach(() => {
    qRScannerModule = new QRScannerModule();
  });

  it('should create an instance', () => {
    expect(qRScannerModule).toBeTruthy();
  });
});
