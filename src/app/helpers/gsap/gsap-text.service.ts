import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapTextService {

  constructor() { }

  /**
   * textAnimate
   * @param className 
   */
  textAnimate(className: string): void {
    gsap.from(className, {
      opacity: 0,
      y: 100,
      duration: 2.5,
      stagger: 0.5,
      ease: 'power2.out'
    });
  }

  /**
   * titleAnimation
   * @param className 
   * @param y 
   * @param duration 
   * @param delay 
   * @param ease 
   */
  titleAnimation = (className: string, y = 50, duration = 1, delay = 0, ease = 'power2.out') => {
    if (className) {
      gsap.from(className, {
        y,
        opacity: 0,
        duration,
        delay,
        ease,
      });
    }
  };

  /**
   * animateTitleLines
   * @param className 
   * @param y 
   * @param duration 
   * @param ease 
   * @param stagger 
   * @returns 
   */
  animateTitleLines(className: string, y = 50, duration = 1, ease = 'power2.out', stagger = 0.2) {
    const heading = document.querySelector(className);

    if (!heading) return;

    gsap.from(heading, {
      y,
      opacity: 0,
      duration,
      ease,
      stagger,
    });
  }

  /**
   * animateLine
   * @param className 
   * @param width 
   * @param duration 
   * @param ease 
   */
  animateLine(className: string, width: string = '100%', duration: number = 1.5, ease: string = 'power2.out') {
    gsap.to(className, {
      width: width,
      duration: duration,
      ease: ease,
    });
  }
}
