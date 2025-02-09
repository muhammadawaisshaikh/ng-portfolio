import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';

@Component({
    selector: 'app-infinite-scrolling-items',
    imports: [NgStyle, NgClass],
    templateUrl: './infinite-scrolling-items.component.html',
    styleUrl: './infinite-scrolling-items.component.scss'
})
export class InfiniteScrollingItemsComponent implements OnInit{
  readonly config = input.required<IInfiniteContentScroll>();

  containerStyle = {};
  contentStyle = {};
  position: string = 'horizontal';

  ngOnInit() {
    this.containerStyle = {
      width: this.config()?.container.width,
      height: this.config()?.container.height
    };

    const config = this.config();
    this.contentStyle = {
      width: config?.content.width,
      height: config?.content.height
    };

    this.position = config.position as string;
  }
}
