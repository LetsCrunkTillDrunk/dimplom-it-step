import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Injectable()
export class QuestionService {

  constructor(private db: AngularFireDatabase, private userService: UserService) {
  }

  getQuestions(): Observable<Question[]> {
    return this.db.list<Question>('/questions/published').valueChanges();
  }
  getUnpublishedQuestions(): Observable<Question[]>{
    return this.db.list<Question>('/questions/unpublished').valueChanges();
  }
  addQuestion(question: Question){
    return this.userService.currentUser.then((user)=>{
      question.createdBy = user.userId;
      question.createdOn = new Date();
      let key = this.db.list<Question>('/questions/unpublished').push(question).key;
      this.db.object('/questions/unpublished/'+ key).update({
        id:key
      });
    })
  }
  approveQuestion(question: Question){
    this.userService.currentUser.then((user)=>{
      question.approvedBy = user.userId;
      question.approvedOn = new Date();
      let key = this.db.list<Question>('/questions/published').push(question).key;
      this.db.object('/questions/published/'+ key).update({
        id:key
      });
      //this.db.list<Question>('/questions/unpublished', ref=> ref.child('id').equalTo(question.id)).remove();
      this.db.object('/questions/unpublished/'+question.id).remove();
    });
    
  }
}