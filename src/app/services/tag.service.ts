import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class TagService {

  constructor(private db: AngularFireDatabase) {
  }

  getTags(): Observable<string[]> {
    return this.db.list<string>('/tagList').valueChanges().pipe(take(1));
  }

}