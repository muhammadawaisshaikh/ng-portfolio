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
    { path: '', name: 'Experience'},
    { path: '', name: 'Portfolio'},
    { path: '', name: 'Technology Talks'},
    { path: '', name: 'Certifications'},
    { path: '', name: 'Publications'},
    { path: '', name: 'Honors & Awards'},
  ]
}
