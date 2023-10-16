import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass']
})
export class QuizzComponent implements OnInit {
  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

    }
  }
  title: string = 'Quizz         Title'

  questions: any
  questionSelected: any

  answers: string[] = []
  answersSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  playerChoose(alias: string) {
    this.answers.push(alias)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      }else{
        return current;
      }
    })
    return result;
  }

  refresh() {
    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length;

    this.questions = quizz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex]

    this.finished = false
  }

}
