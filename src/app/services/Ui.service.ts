// visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _isVisible = new BehaviorSubject<boolean>(false);
  public readonly isVisible = this._isVisible.asObservable();

  show(): void {
    this._isVisible.next(true);
  }

  hide(): void {
    this._isVisible.next(false);
  }
}
