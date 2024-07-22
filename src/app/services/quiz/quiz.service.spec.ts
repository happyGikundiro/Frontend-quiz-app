import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { QUIZZES } from '../../db-data';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return questions for a given topic', () => {
    const questions = service.getQuestions('HTML');
    expect(questions).toEqual(QUIZZES[0].questions);
  });

  it('should return an empty array for a non-existing topic', () => {
    const questions = service.getQuestions('NonExistentTopic');
    expect(questions.length).toBe(0);
  });

  it('should be case insensitive when matching topics', () => {
    const questions = service.getQuestions('html');
    expect(questions).toEqual(QUIZZES[0].questions);
  });
});
