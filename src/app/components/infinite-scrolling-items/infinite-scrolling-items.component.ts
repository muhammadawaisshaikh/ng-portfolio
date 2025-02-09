import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';

@Component({
    selector: 'app-infinite-scrolling-items',
    imports: [NgStyle, NgClass],
    templateUrl: './infinite-scrolling-items.component.html',
    styleUrl: './infinite-scrolling-items.component.scss'
})
export class InfiniteScrollingItemsComponent implements OnInit{
  @Input() config!: IInfiniteContentScroll;

  containerStyle = {};
  contentStyle = {};
  position: string = 'horizontal';

  ngOnInit() {
    this.containerStyle = {
      width: this.config?.container.width,
      height: this.config?.container.height
    };

    this.contentStyle = {
      width: this.config?.content.width,
      height: this.config?.content.height
    };

    this.position = this.config.position as string;
  }
}
