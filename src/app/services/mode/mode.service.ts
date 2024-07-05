import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  darkMode = signal<string>('null')

  handleMode(){
    this.darkMode.update((value)=>(value === 'dark'? 'null':'dark'))
  }

  constructor() { }
}
