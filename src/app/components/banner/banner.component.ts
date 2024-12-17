import { Component, OnDestroy, OnInit } from '@angular/core';
import { GsapTextService } from '../../helpers/gsap/gsap-text.service';
import { InfiniteScrollingItemsComponent } from '../infinite-scrolling-items/infinite-scrolling-items.component';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [InfiniteScrollingItemsComponent, HeaderComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit, OnDestroy {

  skills: string[] = ['JavaScript', 'Typescript', 'Angular', 'NgRX', 'RxJS', 'ReactJS', 'Redux', 'Zustand', 'NodeJS', 'NestJS', 'Python', 'Ai', 'ML', 'DL', 'TanStack', 'UI', 'MicroFrontends', 'MicroServices', 'Architect', 'Software', 'Web', 'Engineering']
  hashtags: string[] = ['Tech Speaker', 'Mentor', 'Author', 'Opensource'];

  infiniteScrollConfig: IInfiniteContentScroll = {
    container: {
      width: '100%',
      height: '50px'
    },
    content: {
      width: '100%',
      height: '50px',
    },
    position: 'horizontal'
  }

  currentHashtag: string = this.hashtags[0];
  private hashtagIndex: number = 0;
  private intervalId: any;

  constructor(
    private gsapService: GsapTextService
  ) {}

  ngOnInit(): void {
    this.gsapService.titleAnimation('.heading', 100, 3, 0.3);
    this.startAnimation();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAnimation(): void {
    this.intervalId = setInterval(() => {
      this.hashtagIndex = (this.hashtagIndex + 1) % this.hashtags.length;
      this.currentHashtag = this.hashtags[this.hashtagIndex];
    }, 1000);
  }
}
