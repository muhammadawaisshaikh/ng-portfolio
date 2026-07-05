import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state/global-state.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  tabs: { path: string, name: string }[] = [
    { path: 'about', name: 'About'},
    { path: 'experience', name: 'Experience'},
    { path: 'portfolio', name: 'Portfolio'},
    { path: 'technology-talks', name: 'Technology Talks'},
    { path: 'certifications', name: 'Certifications'},
    { path: 'publications', name: 'Publications'},
    { path: 'honors-awards', name: 'Honors & Awards'},
  ];

  readonly toggleButton = signal(false);
  readonly sidebar = signal(false);
  readonly fadeSection = signal(false);

  private globalState = inject(GlobalStateService);
  private router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.checkIfNamedOutlet();
    });
  }

  checkIfNamedOutlet() {
    const urlTree = this.router.parseUrl(this.router.url);

    if (urlTree.root.children['pages']) {
      const path: string = urlTree.root.children['pages']?.segments[0]?.path;
      this.onNavigate(path);
    }
  }

  onNavigate(link: string) {
    this.globalState.setIsPageAnimate(true);
    this.router.navigate([{ outlets: { pages: [link] } }]);

    this.toggleMenu();
  }

  toggleMenu() {
    this.toggleButton.update(v => !v);
    this.sidebar.update(v => !v);
  }
}