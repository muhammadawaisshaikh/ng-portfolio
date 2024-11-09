import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalStateService } from '../../services/global-state/global-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  tabs: { path: string, name: string }[] = [
    { path: 'experience', name: 'Experience'},
    { path: 'portfolio', name: 'Portfolio'},
    { path: 'technology-talks', name: 'Technology Talks'},
    { path: 'certifications', name: 'Certifications'},
    { path: 'publications', name: 'Publications'},
    { path: 'honors-awards', name: 'Honors & Awards'},
  ];

  constructor(
    private globalState: GlobalStateService,
    private router: Router
  ) { }

  onNavigate(link: string) {
    this.globalState.setIsPageAnimate(true);
    this.router.navigate([{ outlets: { pages: [link] } }]);
  }
}