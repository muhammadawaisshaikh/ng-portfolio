import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSplashComponent } from './components/loading-splash/loading-splash.component';
import { GlobalStateService } from './services/global-state/global-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSplashComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isHide: boolean = false;
  
  constructor(
    private globalState: GlobalStateService
  ) { }
  
  title = 'ng-portfolio';
  
  ngOnInit(): void {
    this.globalState.isHide.subscribe((val: boolean) => {
      this.isHide = val;
    })
  }
}
