import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingSplashComponent } from './components/loading-splash/loading-splash.component';
import { GlobalStateService } from './services/global-state/global-state.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [NgClass, RouterOutlet, LoadingSplashComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  private globalState = inject(GlobalStateService);
  private router = inject(Router);

  title = 'ng-portfolio';

  readonly isHide = this.globalState.isHide;
  readonly isPageAnimate = this.globalState.isPageAnimate;

  close() {
    this.globalState.setIsPageAnimate(false);
    this.router.navigate(['']);
  }
}
