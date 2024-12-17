import { Component } from '@angular/core';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';
import { IAbout } from '../../interfaces/about';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  about: IAbout = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAboutData();
  }

  getAboutData() {
    this.apiService.getAboutInfo().subscribe((res: any) => {
      this.about = Object.entries(res)[0][1] as IAbout;
    });
  }
}
