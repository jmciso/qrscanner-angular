import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string): void {
    message.trim();
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
