import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CategoryService } from '../../services/category.service';

import { Question, QuestionStatus } from '../../models/question.model';
import { Category } from '../../models/category.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  //questions:Question[];
  //categories:Category[]
  @Input() questions: Question[];
  @Input() showApproveButton: boolean;
  @Output() approveClicked = new EventEmitter<Question>();

  constructor(private questionService:QuestionService, private categoryService:CategoryService) { 
    /*
    this.questionService.getUnpublishedQuestions().subscribe((questions)=>{
      this.questions = questions;
      this.categoryService.getCategories().subscribe((categories)=>{
        this.questions.forEach((q)=>{
          q.categories = [];
          q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id == id)));
        });
      });
    });
    */
  }

  ngOnInit() {
  }
  getDisplayStatus(status: number): string {
    return QuestionStatus[status];
  }
  approveButtonClicked(question: Question ) {
    this.questionService.approveQuestion(question);
    this.approveClicked.emit(question)
  }
}
