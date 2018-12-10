import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getCategories(): Observable<Category[]> {
    return this.db.list<Category>('/categories').valueChanges().pipe(take(1));
  }

}