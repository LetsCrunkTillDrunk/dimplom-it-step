import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CategoryService } from '../../services/category.service';
import { Question } from '../../models/question.model'; 

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  @Input("questions")
  questions:Question[];
  @Input("showApproveButton")
  showApproveButton: boolean;

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

}
