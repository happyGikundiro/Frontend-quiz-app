
import { Component, Input, OnChanges } from '@angular/core';
import { ModeService } from '../../services/mode/mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {
  @Input() topic: string = '';
  @Input() selectedTopic!: string;
  topicIcon: string = '';

  constructor(
    public modeService: ModeService,
  ) {}

  toggleMode() {
    this.modeService.handleMode();
  }

  ngOnChanges() {
    this.updateIcon();
  }

  updateIcon() {
    switch (this.selectedTopic) {
      case 'HTML':
        this.topicIcon = 'html';
        break;
      case 'CSS':
        this.topicIcon = 'css';
        break;
      case 'JavaScript':
        this.topicIcon = 'javascript';
        break;
      case 'Accessibility':
        this.topicIcon = 'accessibility';
        break;
      default:
        this.topicIcon = '';
        break;
    }
  }
}
