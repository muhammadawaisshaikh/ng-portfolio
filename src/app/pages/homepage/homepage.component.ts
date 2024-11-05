import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { RecognitionsContributionsComponent } from '../../components/recognitions-contributions/recognitions-contributions.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BannerComponent, RecognitionsContributionsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
