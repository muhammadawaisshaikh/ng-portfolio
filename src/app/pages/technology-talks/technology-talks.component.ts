import { Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ITechSpeaking } from '../../interfaces/tech-speaking';
import { HashtagsComponent } from '../../components/hashtags/hashtags.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { TechSpeakingDetailsComponent } from "./tech-speaking-details/tech-speaking-details.component";
import { ActivatedRoute, Router } from '@angular/router';
import { sortByYearAndMonth } from '../../helpers/sort-by-date.helper';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-technology-talks',
  imports: [HashtagsComponent, PopupComponent, TechSpeakingDetailsComponent],
  templateUrl: './technology-talks.component.html',
  styleUrl: './technology-talks.component.scss'
})
export class TechnologyTalksComponent {
  readonly isOpenPopup = signal(false);
  readonly selectedTechSpeaking = signal<ITechSpeaking>({});
  private readonly selectedId = signal<string | null>(null);

  // httpResource for the tech speaking list - auto-fetches on component init
  private techSpeakingResource = httpResource<Record<string, ITechSpeaking>>(
    () => `${environment.apiUrl}/tech-speaking.json`
  );

  // httpResource for tech speaking details - reactively fetches when selectedId changes
  private techSpeakingDetailResource = httpResource<ITechSpeaking>(() => {
    const id = this.selectedId();
    if (!id) return undefined; // Don't fetch if no id
    return `${environment.apiUrl}/tech-speaking/${id}.json`;
  });

  // Computed signal that transforms raw resource data into sorted array
  readonly techSpeaking = computed(() => {
    const data = this.techSpeakingResource.value();
    if (!data) return [];

    const techSpeakingData = Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return { id: key, ...value };
      }
      return null;
    }).filter(Boolean) as ITechSpeaking[];

    return sortByYearAndMonth(techSpeakingData);
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Watch for query param changes to load details
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedId.set(id);
        this.watchDetailResource(id);
      }
    });
  }

  private watchDetailResource(id: string): void {
    // Use effect-like pattern: check resource on next change detection
    const checkDetail = setInterval(() => {
      const data = this.techSpeakingDetailResource.value();
      if (data) {
        this.selectedTechSpeaking.set(data);
        this.isOpenPopup.set(true);
        clearInterval(checkDetail);
      }
      if (this.techSpeakingDetailResource.error()) {
        console.error('Error fetching tech speaking details');
        clearInterval(checkDetail);
      }
    }, 100);

    // Safety timeout
    setTimeout(() => clearInterval(checkDetail), 10000);
  }

  getHashTags(technologies: string): string[] {
    const wordsArray = technologies.split(" | ");
    const hashtags = wordsArray.map(word => `${word.replace(/\s+/g, '')}`);

    return hashtags;
  }

  onDetails(item: ITechSpeaking) {
    this.selectedTechSpeaking.set(item);
    this.togglePopup();

    this.router.navigate([], { queryParams: { id: item.id }, queryParamsHandling: 'merge' });
  }

  togglePopup() {
    this.isOpenPopup.update(value => !value);

    if (!this.isOpenPopup()) {
      this.selectedId.set(null);
      this.router.navigate([], { queryParams: { id: null }, queryParamsHandling: 'merge' });
    }
  }
}
