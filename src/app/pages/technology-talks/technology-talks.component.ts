import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ITechSpeaking } from '../../interfaces/tech-speaking';
import { HashtagsComponent } from '../../components/hashtags/hashtags.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { TechSpeakingDetailsComponent } from "./tech-speaking-details/tech-speaking-details.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technology-talks',
  imports: [HashtagsComponent, PopupComponent, TechSpeakingDetailsComponent],
  templateUrl: './technology-talks.component.html',
  styleUrl: './technology-talks.component.scss'
})
export class TechnologyTalksComponent {
  techSpeaking: ITechSpeaking[] = [];
  isOpenPopup = signal(false);
  selectedTechSpeaking: ITechSpeaking = {};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTechSpeakingsData();
  }

  getTechSpeakingsData() {
    this.apiService.getTechSpeakingInfo().subscribe({
      next: (res: any) => {
        const techSpeakingData = Object.entries(res).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return { id: key, ...value };
          }
          return null;
        }).filter(Boolean) as ITechSpeaking[];

        this.techSpeaking = this.sortByYearAndMonth(techSpeakingData);
      },
      error: (error) => {
        console.error('Error fetching tech speaking data:', error);
      },
      complete: () => {
        console.log('Tech speaking data retrieval complete.');
      }
    });
  }

  /**
   * sortByYearAndMonth - Sorts the data by year and month
   * @param data - Array of ITechSpeaking objects
   * @returns 
   */
  sortByYearAndMonth(data: ITechSpeaking[]): ITechSpeaking[] {
    const monthOrder: { [key: string]: number } = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    return data.sort((a: any, b: any) => {
      const [monthA, yearA] = a.date.split(" ");
      const [monthB, yearB] = b.date.split(" ");
      const numYearA = parseInt(yearA, 10);
      const numYearB = parseInt(yearB, 10);

      if (numYearA !== numYearB) {
        return numYearB - numYearA; // Sort by year first (latest first)
      } else {
        return monthOrder[monthB] - monthOrder[monthA]; // Then by month (latest first)
      }
    });
  }


  getHashTags(technologies: string): string[] {
    const wordsArray = technologies.split(" | ");
    const hashtags = wordsArray.map(word => `${word.replace(/\s+/g, '')}`);

    return hashtags;
  }

  onDetails(item: ITechSpeaking) {
    this.selectedTechSpeaking = item;
    this.togglePopup();

    this.router.navigate([], { queryParams: { id: item.id }, queryParamsHandling: 'merge' });
  }

  togglePopup() {
    this.isOpenPopup.update(value => !value);

    if (!this.isOpenPopup()) {
      this.router.navigate([], { queryParams: { id: null }, queryParamsHandling: 'merge' });  
    }
  }
}
