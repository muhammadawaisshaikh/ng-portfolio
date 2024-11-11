import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.getAboutData();
  }

  getAboutData() {
    this.apiService.getAboutInfo().subscribe((res: any) => {
      console.log('About', res);
    });
  }
}
