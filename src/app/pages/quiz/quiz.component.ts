
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
  currentQuestion!: any;
  correctAnswers: number = 0;
  selectedOption: string = '';
  feedback: boolean = false;
  selectedTopic!: string;
  showError: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topic = params['topic'];
      this.selectedTopic = this.topic;
      this.questions = this.quizService.getQuestions(this.topic);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      
    });
  }

  selectOption(option: string): void {
    if (!this.feedback) {
      this.selectedOption = option;
      this.showError = false;
    }
  }


  handleSubmit(): void {
    if (this.feedback) {

      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.goToResultPage(); 
      } else {
        this.nextQuestion();
      }
    } else {
      this.submitAnswer();
    }
  }
  

  submitAnswer(): void {
    if (this.selectedOption === this.currentQuestion.answer) {
      this.correctAnswers++;
    }
    this.feedback = true;
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedOption = '';
      this.feedback = false;
      this.showError = false;
    }
  }

  progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  goToResultPage(): void {
    this.router.navigate(['/result', { correct: this.correctAnswers, total: this.questions.length,topic: this.topic  }]);
  }
}
