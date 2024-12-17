import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ITechSpeaking } from '../../interfaces/tech-speaking';

@Component({
  selector: 'app-technology-talks',
  standalone: true,
  imports: [],
  templateUrl: './technology-talks.component.html',
  styleUrl: './technology-talks.component.scss'
})
export class TechnologyTalksComponent {
  techSpeaking: ITechSpeaking[] = [];

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
}
