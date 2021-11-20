import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoInputService {
  private todoMsgSource = new Subject<string>();
  constructor() {}

  sendMessage(message: string) {
    this.todoMsgSource.next(message);
  }

  getMessage(): Observable<string> {
    return this.todoMsgSource.asObservable();
  }
}
