import { Component, input, OnInit, signal } from '@angular/core';
import { ITechSpeaking } from '../../../interfaces/tech-speaking';
import { ApiService } from '../../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tech-speaking-details',
  imports: [],
  templateUrl: './tech-speaking-details.component.html',
  styleUrl: './tech-speaking-details.component.scss'
})
export class TechSpeakingDetailsComponent implements OnInit {
  readonly conference = input<ITechSpeaking>({});
  techSpeaking = signal<ITechSpeaking>({});

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchTechSpeakingData(id);
      }
    });
  }

  fetchTechSpeakingData(id: string): void {
    this.apiService.getTechSpeakingInfoById(id).subscribe({
      next: (data) => this.techSpeaking.set(data),
      error: (err) => console.error('Error fetching tech speaking details:', err)
    });
  }
}
