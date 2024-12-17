import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
