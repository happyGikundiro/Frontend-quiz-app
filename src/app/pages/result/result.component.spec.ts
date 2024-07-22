import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let routerSpy = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent, NavbarComponent],
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
      },
      { provide: Router, useValue: routerSpy }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
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

  it('should navigate to the home page when Play Again is called', () => {
    // const playAgainButton = fixture.nativeElement.querySelector('button');
    // playAgainButton.click();
    component.playAgain();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

});
