import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../components/login/login.component';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService{

    private dialogRef: MatDialogRef<LoginComponent>;
    private user: User = null;

    constructor(public db: AngularFirestore, private firebase: AngularFireDatabase, 
        public fireAuth: AngularFireAuth, private dialog: MatDialog){}

    showLogin(url?: string) {
        this.dialogRef = this.dialog.open(LoginComponent, {
          disableClose: false,
          backdropClass: "backdrop"
        });
    };
    
    closeLogin(){
        if(this.dialogRef){
            this.dialogRef.close();
        }
    }

    get isAuthenticated() : boolean {
        return !!this.user;
    };

    get currentUser(){
        return new Promise<User>((resolve, reject)=>{
            this.fireAuth.authState.subscribe((user) => {
                if (user) {
                  user.getIdToken(false).then((token)=>{
                    this.user = new User(user);
                    this.user.idToken = token;
                    this.user.roles = ["admin"];
                    let newUser = this.firebase.list<User>('/users', ref=> ref.child('userId').equalTo(this.user.userId));
                    if(!newUser){
                        this.saveUser(this.user);
                    }
                    resolve(this.user);
                  });
                }
                else {
                  this.user = null;
                  reject(null);
                }
              });
        });
    }

    ensureLogin() {
        if (!this.isAuthenticated)
          this.showLogin();
    };

    saveUser (user: User) {
        return this.firebase.list<User>('/users').push(user);
    }
}