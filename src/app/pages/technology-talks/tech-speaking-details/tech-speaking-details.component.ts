import { Component, Input } from '@angular/core';
import { ITechSpeaking } from '../../../interfaces/tech-speaking';

@Component({
    selector: 'app-tech-speaking-details',
    imports: [],
    templateUrl: './tech-speaking-details.component.html',
    styleUrl: './tech-speaking-details.component.scss'
})
export class TechSpeakingDetailsComponent {
  @Input() conference: ITechSpeaking = {};
}
