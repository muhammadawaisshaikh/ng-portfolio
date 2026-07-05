import { Component, inject } from '@angular/core';
import { AboutStore } from '../../store/about.store.service';

@Component({
    selector: 'app-about',
    imports: [],
    providers: [AboutStore],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly store = inject(AboutStore);
}
