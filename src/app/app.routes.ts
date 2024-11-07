import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/homepage/homepage.component').then(c => c.HomepageComponent)
    },
    {
        path: 'experience',
        loadComponent: () =>
            import('./pages/experience/experience.component').then(c => c.ExperienceComponent)
    },
    {
        path: 'portfolio',
        loadComponent: () =>
            import('./pages/portfolio/portfolio.component').then(c => c.PortfolioComponent)
    },
    {
        path: 'technology-talks',
        loadComponent: () =>
            import('./pages/technology-talks/technology-talks.component').then(c => c.TechnologyTalksComponent)
    },
    {
        path: 'certifications',
        loadComponent: () =>
            import('./pages/certifications/certifications.component').then(c => c.CertificationsComponent)
    },
    {
        path: 'publications',
        loadComponent: () =>
            import('./pages/publications/publications.component').then(c => c.PublicationsComponent)
    },
    {
        path: 'honors-awards',
        loadComponent: () =>
            import('./pages/honors-awards/honors-awards.component').then(c => c.HonorsAwardsComponent)
    }
];
