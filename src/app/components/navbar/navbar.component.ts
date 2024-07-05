import { Component } from '@angular/core';
import { ModeService } from '../../services/mode/mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(public modeService: ModeService){}

toggleMode(){
  this.modeService.handleMode();
}

}
