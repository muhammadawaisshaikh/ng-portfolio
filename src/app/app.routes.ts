import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/homepage/homepage.component').then(c => c.HomepageComponent)
    }
];
