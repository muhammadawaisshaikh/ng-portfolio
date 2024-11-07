import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  tabs: { path: string, name: string }[] = [
    { path: '/experience', name: 'Experience'},
    { path: '/portfolio', name: 'Portfolio'},
    { path: '/technology-talks', name: 'Technology Talks'},
    { path: '/certifications', name: 'Certifications'},
    { path: '/publications', name: 'Publications'},
    { path: '/honors-awards', name: 'Honors & Awards'},
  ]
}