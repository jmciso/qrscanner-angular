import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { tap } from 'rxjs/operators';
import { QrScannerService } from '../qrscanner/qrscanner.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css', '../app.component.css']
})
export class QrScannerComponent implements OnInit {
  @ViewChild('feed')
  feed: ElementRef;
  @ViewChild('canvas')
  canvas: ElementRef;
  public isCameraOn = false;
  public btnMessage = 'start';
  constructor(
    private qrScannerService: QrScannerService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  toggleCamera(): void {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      this.startCamera();
    }
  }

  private startCamera(): void {
    this.qrScannerService.start(
      this.feed.nativeElement,
      this.canvas.nativeElement,
      [
        tap(stream => {
          const video = this.feed.nativeElement;
          video.srcObject = stream;
          video.setAttribute('playsinline', true);
          video.play();
          this.isCameraOn = true;
          this.btnMessage = 'stop';
        })
      ],
      () => {
        this.isCameraOn = false;
        this.btnMessage = 'start';
      }
    );
  }

  private stopCamera(): void {
    this.qrScannerService.stop();
    this.isCameraOn = false;
    this.btnMessage = 'start';
  }

  private log(message: string): void {
    this.messageService.add(message);
  }

}
