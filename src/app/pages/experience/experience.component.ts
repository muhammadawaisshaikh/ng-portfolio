import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { IExperience } from '../../interfaces/experience';

@Component({
    selector: 'app-experience',
    imports: [],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  experiences: IExperience[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getExperiencesData();
  }

  getExperiencesData() {
    this.apiService.getExperiencesInfo().subscribe((res: any) => {
      this.experiences = Object.values(res) as IExperience[];
    });
  }
}
