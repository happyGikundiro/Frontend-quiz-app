import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';
import { QUIZZES } from '../../db-data';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let router: Router;
  let quizService: QuizService;

  const mockActivatedRoute = {
    params: {
      subscribe: (callback: (params: any) => void) => callback({ topic: 'javascript' })
    }
  };

  const mockQuizService = {
    quizzes: QUIZZES,
  
    getQuestions(topic: string):any[]{
      const quiz = this.quizzes.find(q => q.title.toLowerCase() === topic.toLowerCase());
      return quiz ? quiz.questions : [];
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: QuizService, useValue: mockQuizService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct route parameters and questions', () => {
    expect(component.topic).toBe('javascript');
    expect(component.selectedTopic).toBe('javascript');
    expect(component.questions.length).toBe(2);
    expect(component.currentQuestion).toEqual(component.questions[0]);
  });

  it('should select an option', () => {
    component.selectOption('Language');
    expect(component.selectedOption).toBe('Language');
  });

  it('should handle submit and show feedback', () => {
    component.selectOption('Language');
    component.handleSubmit();
    expect(component.feedback).toBe(true);
    expect(component.correctAnswers).toBe(1);
  });

  it('should move to the next question on handleSubmit if feedback is true', () => {
    component.selectOption('Language');
    component.handleSubmit();
    component.handleSubmit();
    expect(component.currentQuestionIndex).toBe(1);
    expect(component.currentQuestion).toEqual(component.questions[1]);
    expect(component.selectedOption).toBe('');
    expect(component.feedback).toBe(false);
  });

});
