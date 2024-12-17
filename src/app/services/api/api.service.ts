import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAbout } from '../../interfaces/about';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { IExperience } from '../../interfaces/experience';
import { ITechSpeaking } from '../../interfaces/tech-speaking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getAboutInfo(): Observable<IAbout> {
    const aboutURL: string = `${environment.apiUrl}/about.json`;
    return this.http.get<IAbout>(aboutURL);
  }

  getExperiencesInfo(): Observable<IExperience> {
    const experiencesURL: string = `${environment.apiUrl}/experiences.json`;
    return this.http.get<IExperience>(experiencesURL);
  }

  getTechSpeakingInfo(): Observable<ITechSpeaking> {
    const experiencesURL: string = `${environment.apiUrl}/tech-speaking.json`;
    return this.http.get<ITechSpeaking>(experiencesURL);
  }
}
