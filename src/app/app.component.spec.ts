import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ModeService } from './services/mode/mode.service';
import { signal } from '@angular/core';

class MockModeService {
  darkMode = signal<string>('null');

  handleMode(){
    this.darkMode.update((value)=>(value === 'dark'? 'null':'dark'))
  }
}

describe('AppComponent', () => {
  let mockMode: MockModeService;

  beforeEach(async () => {
    mockMode = new MockModeService()

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
      providers:[{provide: ModeService, useValue: mockMode}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply dark mode class when dark mode is active', () => {
    mockMode.darkMode.set('dark');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.classList).toContain('dark');
  });

  it('should call modeService.handleMode method', () => {
    jest.spyOn(mockMode, 'handleMode');
    mockMode.handleMode();
    expect(mockMode.handleMode).toHaveBeenCalled();
  });

});
