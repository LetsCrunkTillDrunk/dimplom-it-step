import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { Category } from '../../models/category.model';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  questions: Question[];
  tags: string[];
  categories: Category[];
  sampleQuestions: Question[];
  sampleCount: number = 2;

  constructor(private questionService: QuestionService, private categoryService: CategoryService, private tagService: TagService) { 
    this.questionService.getUnpublishedQuestions().subscribe((questions)=>{
      this.questions = questions;
      this.categoryService.getCategories().subscribe((categories)=>{
        this.categories = categories;
        this.questions.forEach((q)=>{
          q.categories = [];
          q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id == id)));
        });
        this.sampleQuestions = this.questions.slice(0, this.sampleCount);
      });
    });
    this.tagService.getTags().subscribe((tags)=>this.tags=tags);
  }

  ngOnInit() {
  }

}
