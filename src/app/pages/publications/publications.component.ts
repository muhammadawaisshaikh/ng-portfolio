import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { IBlog } from '../../interfaces/blog';
import { sortByYearAndMonth } from '../../helpers/sort-by-date.helper';

@Component({
    selector: 'app-publications',
    imports: [],
    templateUrl: './publications.component.html',
    styleUrl: './publications.component.scss'
})
export class PublicationsComponent {
    blogs: IBlog[] = [];

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.getTechSpeakingsData();
    }

    getTechSpeakingsData() {
        this.apiService.getBlogs().subscribe({
            next: (res: any) => {
                const blogsData = Object.entries(res).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        return { id: key, ...value };
                    }
                    return null;
                }).filter(Boolean) as IBlog[];

                this.blogs = sortByYearAndMonth(blogsData);
            },
            error: (error) => {
                console.error('Error fetching tech speaking data:', error);
            },
            complete: () => {
                console.log('Tech speaking data retrieval complete.');
            }
        });
    }

    onBlogView(url: string | undefined): void {
        if (url) {
            window.open(url, '_blank');
        }
    }
}
