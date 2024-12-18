import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() isOpen: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();

  closePopup() {
    this.toggle.emit(!this.isOpen);
  }
}
