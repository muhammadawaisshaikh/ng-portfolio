import { Component, OnInit } from '@angular/core';
import { GsapGlobalService } from '../../helpers/gsap/gsap-global.service';

@Component({
  selector: 'app-loading-splash',
  standalone: true,
  imports: [],
  templateUrl: './loading-splash.component.html',
  styleUrl: './loading-splash.component.scss'
})
export class LoadingSplashComponent implements OnInit {
  constructor(
    private gsapService: GsapGlobalService
  ) { }

  ngOnInit(): void {
    this.gsapService.globalLoadingSplash('.left-cover', '.right-cover')
  }
}
