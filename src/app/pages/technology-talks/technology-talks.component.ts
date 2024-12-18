import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ITechSpeaking } from '../../interfaces/tech-speaking';
import { HashtagsComponent } from '../../components/hashtags/hashtags.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { TechSpeakingDetailsComponent } from "./tech-speaking-details/tech-speaking-details.component";

@Component({
  selector: 'app-technology-talks',
  standalone: true,
  imports: [HashtagsComponent, PopupComponent, TechSpeakingDetailsComponent],
  templateUrl: './technology-talks.component.html',
  styleUrl: './technology-talks.component.scss'
})
export class TechnologyTalksComponent {
  techSpeaking: ITechSpeaking[] = [];
  isOpenPopup = signal(false);
  selectedTechSpeaking: ITechSpeaking = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getTechSpeakingsData();
  }

  getTechSpeakingsData() {
    this.apiService.getTechSpeakingInfo().subscribe((res: any) => {
      this.techSpeaking = Object.values(res) as ITechSpeaking[];
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
  }

  togglePopup() {
    this.isOpenPopup.update(value => !value);
  }
}
