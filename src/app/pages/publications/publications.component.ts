import { Component } from '@angular/core';

interface ProfileLink {
    id: string;
    title: string;
    description: string;
    url: string;
    iconClass: string;
}

@Component({
    selector: 'app-publications',
    imports: [],
    templateUrl: './publications.component.html',
    styleUrl: './publications.component.scss'
})
export class PublicationsComponent {
    readonly profiles: ProfileLink[] = [
        {
            id: 'medium',
            title: 'Medium',
            description: 'Articles, essays, and technical writing published from my Medium profile.',
            url: 'https://medium.com/@awaisshaikh94',
            iconClass: 'fa-brands fa-medium'
        },
        {
            id: 'scholar',
            title: 'Google Scholar',
            description: 'Academic publications and citation profile on Google Scholar.',
            url: 'https://scholar.google.com/citations?user=A8mP7UMAAAAJ&hl=en',
            iconClass: 'fa-solid fa-graduation-cap'
        },
        {
            id: 'researchgate',
            title: 'ResearchGate',
            description: 'Research profile and publications on ResearchGate.',
            url: 'https://www.researchgate.net/profile/Muhammad-Awais-213',
            iconClass: 'fa-solid fa-flask'
        },
        {
            id: 'amazon',
            title: 'Amazon Author Store',
            description: 'Books and authored publications listed in my Amazon author store.',
            url: 'https://www.amazon.com/stores/Mr.-Muhammad-Awais/author/B0DM9F12NJ',
            iconClass: 'fa-brands fa-amazon'
        }
    ];

    openProfile(url: string | undefined): void {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
}
