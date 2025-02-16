import { Component, inject } from '@angular/core';
import { ProjectsStore } from '../../store/projects.store.service';

@Component({
    selector: 'app-portfolio',
    imports: [],
    providers: [ProjectsStore],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
    readonly store = inject(ProjectsStore);

    ngOnInit(): void {
        this.store.loadProjectsData();
    }
}
