import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  isHide: boolean = false;
  isPageAnimate: boolean = false;
  
  constructor(
    private globalState: GlobalStateService,
    private router: Router
  ) { }
  
  title = 'ng-portfolio';
  
  ngOnInit(): void {
    this.globalState.isHide.subscribe((val: boolean) => {
      this.isHide = val;
    });

    this.globalState.isPageAnimate.subscribe((val: boolean) => {
      this.isPageAnimate = val;
    })
  }

  close() {
    this.globalState.setIsPageAnimate(false);
    this.router.navigate(['']);
  }
}
