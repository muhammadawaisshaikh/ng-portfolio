import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSplashComponent } from './components/loading-splash/loading-splash.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSplashComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-portfolio';
}
