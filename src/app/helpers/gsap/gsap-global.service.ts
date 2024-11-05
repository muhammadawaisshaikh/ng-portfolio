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
      y: '-100%', // Move the top cover up
      duration: 1.5,
      ease: 'power2.out',
    });

    gsap.to(bottomCover, {
      y: '100%', // Move the bottom cover down
      duration: 1.5,
      ease: 'power2.out',
    });
  }
}
