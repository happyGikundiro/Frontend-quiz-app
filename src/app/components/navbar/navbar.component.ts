import { Component, effect, HostBinding, signal } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // darkMode = signal<boolean>(
  //   JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  // )

  darkMode = signal<boolean>(false)

  @HostBinding('class.dark') get mode (){
    return this.darkMode()
  }

  constructor(){
    effect(()=>{
      // window.localStorage.setItem('darkMode',JSON.stringify(this.darkMode()))
    })
  }

// constructor(private service: QuizService){}

// handleMode(){
//   const darkMode = this.service.darkMode()
// }
}
