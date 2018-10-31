import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { MessagesComponent } from './messages/messages.component';
import { QRScannerModule } from './qrscanner/qrscanner.module';

@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    QRScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
