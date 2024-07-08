import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModeService } from '../../services/mode/mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, public modeService: ModeService){}

  startQuiz(topic: string){
    this.router.navigate(['quiz',topic])
  }
}
