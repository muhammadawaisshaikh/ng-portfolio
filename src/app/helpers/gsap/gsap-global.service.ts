import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapGlobalService {

  constructor() { }

  /**
   * Animate the covers to reveal the content
   */
  globalLoadingSplash(leftCover: string = '.left-cover', rightCover: string = '.right-cover', delay: number = 1) {
    gsap.to(leftCover, {
      width: 0,
      x: '-100%',
      duration: 2,
      delay: delay,
      ease: 'power2.out',
    });
  
    gsap.to(rightCover, {
      width: 0,
      x: '100%',
      duration: 2,
      delay: delay,
      ease: 'power2.out',
    });
  }
}
