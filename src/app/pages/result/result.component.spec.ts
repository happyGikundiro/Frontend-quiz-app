import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports:[RouterTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue:{
          params: {
            subscribe: (callback: any) => callback({
              correct: '5',
              total: '10',
              topic: 'javascript'
            })
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct route parameters', () => {
    expect(component.correctAnswers).toBe(5);
    expect(component.totalQuestions).toBe(10);
    expect(component.topic).toBe('javascript');
    expect(component.selectedTopic).toBe('javascript');
  });

  it('should set the topic icon based on the topic', () => {
    expect(component.topicIcon).toBe('javascript');
  });

  it('should navigate to the home page when "Play Again" is clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const playAgainButton = fixture.nativeElement.querySelector('button');
    playAgainButton.click();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

});
