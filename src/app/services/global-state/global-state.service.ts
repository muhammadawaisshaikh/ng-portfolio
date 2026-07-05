import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  readonly isHide = signal(false);
  readonly isPageAnimate = signal(false);

  setIsHide(val: boolean) {
    this.isHide.set(val);
  }

  setIsPageAnimate(val: boolean) {
    this.isPageAnimate.set(val);
  }
}
