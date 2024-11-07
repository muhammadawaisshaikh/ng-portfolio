import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  public isHide: any = new BehaviorSubject(false);

  constructor() { }

  setIsHide(val: boolean) {
    return this.isHide.next(val);
  }
}
