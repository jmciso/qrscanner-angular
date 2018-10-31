import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class MediaStreamingService {

  constructor() { }

  getMediaStream(constraints: any): Observable<MediaStream> {
    return fromPromise(navigator.mediaDevices.getUserMedia(constraints));
  }
}
