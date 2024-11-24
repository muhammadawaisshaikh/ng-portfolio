import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { IAbout } from '../../interfaces/about';
import { IExperience } from '../../interfaces/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  about: IAbout = {};
  experiences: IExperience = {};

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
      this.experiences = Object.values(res) as IExperience;
      console.log(this.experiences);
    });
  }
}
