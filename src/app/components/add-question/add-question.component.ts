import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Question, Answer } from '../../models/question.model';
import { Category } from "../../models/category.model";
import { QuestionService } from '../../services/question.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  sub1: any;
  sub2: any;

  categories: Category[];

  questionForm: FormGroup;
  question: Question;

  autoTags: string[] = [];
  tags: string[];
  enteredTags: string[] = [];  

  get answers(): FormArray { 
    return this.questionForm.get('answers') as FormArray; 
  }
  get tagsArray(): FormArray { 
    return this.questionForm.get('tagsArray') as FormArray; 
  }
  constructor(private fb: FormBuilder, private questionService: QuestionService,
    private tagService: TagService, private categoryService: CategoryService, private router:Router,
    public snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.question = new Question();
    this.createForm(this.question);
    let questionControl = this.questionForm.get('questionText');
    questionControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.computeAutoTags());
    this.answers.valueChanges.pipe(debounceTime(500)).subscribe(v => this.computeAutoTags());

    this.sub1 = this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);

    this.sub2 = this.tagService.getTags()
    .subscribe(tags => this.tags = tags);
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

  createForm(question:Question){
    let fgAnswers:FormGroup[] = question.answers.map(answer => {
      let fg = new FormGroup({
        answerText: new FormControl(answer.answerText, Validators.required),
        correct: new FormControl(answer.correct),
      });
      return fg;
    });
    let answers = new FormArray(fgAnswers);
    let fcTags:FormControl[] = question.tags.map(tag => {
      let fc = new FormControl(tag);
      return fc;
    });
    if (fcTags.length == 0)
      fcTags = [new FormControl('')];
    let tags = new FormArray(fcTags);
    this.questionForm = this.fb.group({
      category: [(question.categories.length>0? question.categories[0] : ''), Validators.required],
      questionText: [question.questionText, Validators.required],
      tags: '',
      tagsArray: tags,
      answers: answers,
      ordered: [question.ordered],
      explanation: [question.explanation]
    }, {validator: questionFormValidator});
  }

  computeAutoTags() {
    let allTextValues: string[] = [this.questionForm.value.questionText];
    this.questionForm.value.answers.forEach(answer => allTextValues.push(answer.answerText));
    let wordString: string = allTextValues.join(" ");
    let matchingTags: string[] = [];
    this.tags.forEach(tag => {
      let patt = new RegExp('\\b(' + tag.replace("+", "\\+") + ')\\b', "ig");
      if (wordString.match(patt))
        matchingTags.push(tag);
    });
    this.autoTags = matchingTags;
    this.setTagsArray();
  }

  addTag() {
    let tag = this.questionForm.get('tags').value;
    if (tag) {
      if (this.enteredTags.indexOf(tag) < 0)
        this.enteredTags.push(tag);
      this.questionForm.get('tags').setValue('');
    }
    this.setTagsArray();
  }

  setTagsArray() {
    this.tagsArray.controls = [];
    [...this.autoTags, ...this.enteredTags].forEach(tag => this.tagsArray.push(new FormControl(tag)));
  }

  removeEnteredTag(tag) {
    this.enteredTags = this.enteredTags.filter(t => t !== tag); 
    this.setTagsArray();
  }

  saveQuestion(question: Question) {
    this.questionService.addQuestion(question).then((response) => {
      this.snackBar.open("Question saved!", "", {duration: 2000});
      this.router.navigate(['/questions']);
    }, (error) => console.log(error));
  }

  onSubmit() {
    this.questionForm.updateValueAndValidity();
    if (this.questionForm.invalid)
      return;
    let question: Question = this.getQuestionFromFormValue(this.questionForm.value);
    this.saveQuestion(question);
  }

  getQuestionFromFormValue(formValue: any): Question {
    let question: Question;

    question = new Question();
    question.questionText = formValue.questionText;
    question.answers = formValue.answers;
    question.categoryIds = [formValue.category];
    question.tags = [...this.autoTags, ...this.enteredTags]
    question.ordered = formValue.ordered;
    question.explanation = formValue.explanation;

    return question;
  }
}

function questionFormValidator(fg: FormGroup): {[key: string]: boolean} {
  let answers: Answer[] = fg.get('answers').value;
  if (answers.filter(answer => answer.correct).length === 0)
    return {'correctAnswerCountInvalid': true}
  return null;
}
