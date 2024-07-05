import { Injectable, signal } from '@angular/core';
import { Quiz } from '../../module/quiz';
import { QUIZZES } from '../../db-data';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizzes:Quiz[] = QUIZZES

  constructor() { }

  getQuestions(topic: string):any[]{
    const quiz = this.quizzes.find(q => q.title.toLowerCase() === topic.toLowerCase());
    return quiz ? quiz.questions : [];
  }
}
