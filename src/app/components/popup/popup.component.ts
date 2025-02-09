import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-popup',
    imports: [],
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.scss'
})
export class PopupComponent {
  readonly isOpen = input<boolean>(false);
  @Output() toggle = new EventEmitter<boolean>();

  closePopup() {
    this.toggle.emit(!this.isOpen());
  }
}
