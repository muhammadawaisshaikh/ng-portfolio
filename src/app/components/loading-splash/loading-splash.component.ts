import { Component, OnInit } from '@angular/core';
import { GsapGlobalService } from '../../helpers/gsap/gsap-global.service';
import { GlobalStateService } from '../../services/global-state/global-state.service';

@Component({
  selector: 'app-loading-splash',
  standalone: true,
  imports: [],
  templateUrl: './loading-splash.component.html',
  styleUrl: './loading-splash.component.scss'
})
export class LoadingSplashComponent implements OnInit {

  constructor(
    private gsapService: GsapGlobalService,
    private globalState: GlobalStateService
  ) { }

  ngOnInit(): void {
    this.initLoadingAnimations();
  }

  initLoadingAnimations() {
    const animateSections = new Promise<void>((resolve) => {
      this.gsapService.globalLoadingSplash('.left-cover', '.right-cover', 1);
      setTimeout(resolve, 0);
    });

    const animateLoadingTypo = new Promise<void>((resolve) => {
      this.gsapService.globalLoaderTypo('.text-loading', 1, 0.2);
      setTimeout(resolve, 0);
    });

    Promise.all([animateSections, animateLoadingTypo]).then(() => {
      setTimeout(() => {
        this.globalState.setIsHide(true);
      }, 2000);

    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  }
}
