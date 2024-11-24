import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { IAbout } from '../../interfaces/about';
import { IExperience } from '../../interfaces/experience';
import { InfiniteScrollingItemsComponent } from '../../components/infinite-scrolling-items/infinite-scrolling-items.component';
import { IInfiniteContentScroll } from '../../interfaces/infinite-scroll';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [InfiniteScrollingItemsComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  about: IAbout = {};
  experiences: IExperience[] = [];

  infiniteScrollConfig: IInfiniteContentScroll = {
    container: {
      width: 'auto',
      height: '80vh'
    },
    content: {
      width: 'auto',
      height: '80vh',
    },
    position: 'vertical'
  }

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAboutData();
    this.getExperiencesData();
  }

  getAboutData() {
    this.apiService.getAboutInfo().subscribe((res: any) => {
      this.about = Object.entries(res)[0][1] as IAbout;
      console.log(this.about);
    });
  }

  getExperiencesData() {
    this.apiService.getExperiencesInfo().subscribe((res: any) => {
      this.experiences = Object.values(res) as IExperience[];
      console.log(this.experiences);
    });
  }
}
