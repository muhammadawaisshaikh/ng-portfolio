import { NgStyle } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hashtags.component.html',
  styleUrl: './hashtags.component.scss'
})
export class HashtagsComponent implements OnInit {
  @Input() hashtags: string[] = [];
  hashtagGradients: string[] = [];

  ngOnInit(): void {
    this.hashtagGradients = this.hashtags.map(() => this.getRandomGradient());
  }

  /**
   * getRandomGradient Function
   * @returns linear-gradient
   */
  getRandomGradient(): string {
    const colors = [
      this.getRandomColor(),
      this.getRandomColor()
    ];
    return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  }

  /**
   * getRandomColor Function
   * @returns random color
   */
  getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}