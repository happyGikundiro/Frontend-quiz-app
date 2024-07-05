
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  topic!: string;
  questions!: any[];
  currentQuestionIndex: number = 0;
  correctAnswers: number = 0;
  currentQuestion: any;
  selectedOption: string = '';
  feedback: string = '';

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params',params)
      this.topic = params['topic'];
      this.questions = this.quizService.getQuestions(this.topic);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    });
  }

  submitAnswer(): void {
    if (this.selectedOption === this.currentQuestion.answer) {
      this.feedback = 'Correct!';
      this.correctAnswers++;
    } else {
      this.feedback = 'Incorrect!';
    }
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedOption = '';
      this.feedback = '';
    } else {
      this.router.navigate(['/result', { correct: this.correctAnswers, total: this.questions.length }]);
    }
  }
}
