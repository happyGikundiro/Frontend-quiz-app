// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-result',
//   templateUrl: './result.component.html',
//   styleUrls: ['./result.component.css']
// })
// export class ResultComponent implements OnInit {
//   correctAnswers: number = 0;
//   totalQuestions: number = 0;

//   constructor(private route: ActivatedRoute, private router: Router) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.correctAnswers = +params['correct'];
//       this.totalQuestions = +params['total'];
//     });
//   }

//   playAgain(): void {
//     this.router.navigate(['']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  correctAnswers!: number;
  totalQuestions!: number;
  topic!: string;
  topicIcon!: string;
  selectedTopic!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.correctAnswers = +params['correct'];
      this.totalQuestions = +params['total'];
      this.topic = params['topic'];
      this.selectedTopic = this.topic;
      this.setTopicIcon(this.topic);
    });
  }

  setTopicIcon(topic: string): void {
    switch(topic.toLowerCase()) {
      case 'html':
        this.topicIcon = 'html';
        break;
      case 'css':
        this.topicIcon = 'css';
        break;
      case 'javascript':
        this.topicIcon = 'javascript';
        break;
      case 'accessibility':
        this.topicIcon = 'accessibility';
        break;
      default:
        this.topicIcon = '';
    }
  }

  playAgain(): void {
        this.router.navigate(['']);
     }
}
