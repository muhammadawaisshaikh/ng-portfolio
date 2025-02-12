import { Component, inject } from '@angular/core';
import { AboutStore } from '../../store/about.store.service';

@Component({
    selector: 'app-about',
    imports: [],
    providers: [AboutStore], // if you want to make private separate instance of about store
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly store = inject(AboutStore);

  ngOnInit(): void {
    this.store.loadAboutData();
  }
}
