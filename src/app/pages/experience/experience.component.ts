import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { IAbout } from '../../interfaces/about';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAboutData();
  }

  getAboutData() {
    this.apiService.getAboutInfo().subscribe((res: IAbout) => {
      console.log('About', res);
    });
  }
}
