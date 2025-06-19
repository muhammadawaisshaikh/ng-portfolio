import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ITechSpeaking } from '../../interfaces/tech-speaking';
import { HashtagsComponent } from '../../components/hashtags/hashtags.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { TechSpeakingDetailsComponent } from "./tech-speaking-details/tech-speaking-details.component";
import { ActivatedRoute, Router } from '@angular/router';
import { sortByYearAndMonth } from '../../helpers/sort-by-date.helper';

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
  techSpeakingDetails = signal<ITechSpeaking>({});

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTechSpeakingsData();

     // Fetch tech speaking details if id is present in the query params
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchTechSpeakingDetails(id);
      }
    });
  }

  // Fetches tech speaking data from the API
  getTechSpeakingsData() {
    this.apiService.getTechSpeakingInfo().subscribe({
      next: (res: any) => {
        const techSpeakingData = Object.entries(res).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return { id: key, ...value };
          }
          return null;
        }).filter(Boolean) as ITechSpeaking[];

        this.techSpeaking = sortByYearAndMonth(techSpeakingData);
      },
      error: (error) => {
        console.error('Error fetching tech speaking data:', error);
      },
      complete: () => {
        console.log('Tech speaking data retrieval complete.');
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

  // Fetches tech speaking details by id
  fetchTechSpeakingDetails(id: string): void {
    this.apiService.getTechSpeakingInfoById(id).subscribe({
      next: (data: ITechSpeaking) => {
        if (data) {
          this.selectedTechSpeaking = data;
          this.techSpeakingDetails.set(data);
          this.isOpenPopup.set(true);

          this.router.navigate([], {
            queryParams: { id }, 
            queryParamsHandling: 'merge'
          });
        }
      },
      error: (err) => console.error('Error fetching tech speaking details:', err)
    });
  }
}
