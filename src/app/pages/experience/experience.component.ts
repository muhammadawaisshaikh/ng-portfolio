import { Component, inject } from '@angular/core';
import { ExperienceStore } from '../../store/experience.store.service';

@Component({
    selector: 'app-experience',
    imports: [],
    providers: [ExperienceStore], // Private instance for this component
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  readonly store = inject(ExperienceStore);

  ngOnInit(): void {
    this.store.loadExperienceData();

    this.store.loadExperienceData().then(res => {
      console.log(res);
      
    })
    
  }
}