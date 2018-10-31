import { Injectable } from '@angular/core';
import { QRScannerModule } from './qrscanner.module';
import { MediaStreamingService } from './media-streaming.service';

import jsQR from 'jsqr';
import { Observable, OperatorFunction, of, Subject } from 'rxjs';
import { tap, switchMap, repeat, takeUntil } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

@Injectable({
  providedIn: QRScannerModule
})
export class QrScannerService {
  private stopSubject$: Subject<any> = new Subject();
  private videoTracks: MediaStreamTrack[];
  constructor(private mediaStreamingService: MediaStreamingService) { }

  processVideo(video: any, canvasElem: any): Observable<any> {
    return of(0, animationFrame) // emits single value when window.requestAnimationFrame would fire
    .pipe(
      repeat(), // repeats emited value on next scheduled requestAnimationFrame
      tap( () => {
        const ctx = canvasElem.getContext('2d');
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvasElem.height = video.videoHeight;
          canvasElem.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvasElem.width, canvasElem.height);
          const imageData = ctx.getImageData(0, 0, canvasElem.width, canvasElem.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) { // qrcode detected
            console.log(`Data found: ${code.data}`);
            this.stop();
          }
        }
      })
    );
  }

  public start(videoElem: any, canvasElem: any, operators: OperatorFunction<any, any>[] = [], onEndSubscribeFn?: Function): void {
    const mediaStream$ = this.mediaStreamingService.getMediaStream({
      video: true
    });
    mediaStream$.pipe(
      tap(stream => this.videoTracks = stream.getVideoTracks()),
      ...operators,
      switchMap(_unused => this.processVideo(videoElem, canvasElem)), // maps the mediastream value to new observable stream
      takeUntil(this.stopSubject$), // completes the observable
    )
    .subscribe(
      null,
      null,
      () => onEndSubscribeFn && onEndSubscribeFn()
    );
  }

  stop(): void {
    this.videoTracks.map(track => track.stop());
    this.stopSubject$.next('stop');
  }
}
