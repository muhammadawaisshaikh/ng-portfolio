import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MediumRSSArticle } from '../../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class MediumRssService {
  mediumRssBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url';

  private http: HttpClient = inject(HttpClient);

  getMediumRssFeed(): Observable<MediumRSSArticle[]> {
    const mediumRssUrl: string = `${this.mediumRssBaseUrl}=https://medium.com/feed/@awaisshaikh94`;

    return this.http.get<{ items: MediumRSSArticle[] }>(mediumRssUrl).pipe(
      map(res => res.items)
    );
  }
}
