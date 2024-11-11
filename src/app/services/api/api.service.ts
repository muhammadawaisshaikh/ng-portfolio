import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAbout } from '../../interfaces/about';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

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
}
