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
  globalLoadingSplash(topCover: string = '.top-cover', bottomCover: string = '.bottom-cover') {
    gsap.to(topCover, {
      height: 0, // Animate the top cover's height to 0
      duration: 2,
      delay: 0.3,
      ease: 'power2.out',
    });

    gsap.to(bottomCover, {
      height: 0, // Animate the bottom cover's height to 0
      duration: 2,
      delay: 0.3,
      ease: 'power2.out',
    });
  }
}
