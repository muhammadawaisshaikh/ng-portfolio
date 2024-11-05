import { Component, OnInit } from '@angular/core';
import { GsapTextService } from '../../helpers/gsap/gsap-text.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {

  skills: string[] = ['JavaScript', 'Typescript', 'Angular', 'ReactJS', 'NodeJS', 'Python', 'Artificial Intelligence']

  constructor(
    private gsapService: GsapTextService
  ) {}

  ngOnInit(): void {
    this.gsapService.titleAnimation('.heading', 50, 2, 0.3);
    this.gsapService.animateLine('.animated-line', '100%', 4,'power2.out');
  }

}
