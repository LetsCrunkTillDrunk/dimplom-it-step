import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService} from '../../services/question.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  private questions: Question[];
  private unpublishedQuestions: Question[];
  private categories: Category[];

  constructor(private questionService: QuestionService, private categoryService: CategoryService) { 
    this.questionService.getUnpublishedQuestions().subscribe((questions)=>{
      this.unpublishedQuestions = questions;
      this.categoryService.getCategories().subscribe((categories)=>{
        this.categories = categories;
        this.questions.forEach((q)=>{
          q.categories = [];
          q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id == id)));
        });
      });
    });
    this.questionService.getQuestions().subscribe((questions)=>{
      this.questions = questions;
      this.categoryService.getCategories().subscribe((categories)=>{
        this.questions.forEach((q)=>{
          q.categories = [];
          q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id == id)));
        });
      });
    });
  }

  ngOnInit() {
  }

}
