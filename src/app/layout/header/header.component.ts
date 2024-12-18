import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state/global-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
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

  toggleButton: boolean = false;
  sidebar: boolean = false;
  fadeSection: boolean = false;

  constructor(
    private globalState: GlobalStateService,
    private router: Router
  ) { }

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
    // animating icon
    this.toggleButton = !this.toggleButton;

    // animating sidebar
    this.sidebar = !this.sidebar;

    // enabling fade section 
    this.fadeSection = !this.fadeSection;
  }
}