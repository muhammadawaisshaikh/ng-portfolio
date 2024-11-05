import { Component, OnInit } from '@angular/core';
import { GsapTextService } from '../../helpers/gsap/gsap-text.service';
import { InfiniteScrollingItemsComponent } from '../infinite-scrolling-items/infinite-scrolling-items.component';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [InfiniteScrollingItemsComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {

  skills: string[] = ['JavaScript', 'Typescript', 'Angular', 'NgRX', 'RxJS', 'ReactJS', 'Redux', 'NodeJS', 'Python', 'Ai', 'TanStack', 'UI', 'MicroFrontends', 'MicroServices']
  infiniteScrollConfig: IInfiniteContentScroll = {
    container: {
      width: '100%',
      height: '50px'
    },
    content: {
      width: '1080px',
      height: '50px'
    }
  }

  constructor(
    private gsapService: GsapTextService
  ) {}

  ngOnInit(): void {
    this.gsapService.titleAnimation('.heading', 50, 2, 0.3);
    this.gsapService.animateLine('.animated-line', '100%', 4,'power2.out');
  }

}
