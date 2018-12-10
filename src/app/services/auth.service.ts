import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable()
export class AuthService{

    constructor(private fireAuth:AngularFireAuth, private router:Router){

    }

    signInWithTwitter(){
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider);
    }

    signInWithFacebook(){
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
    }

    signInWithGoogle(){
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    register(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    login(email, password){
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout(){
        return this.fireAuth.auth.signOut();
    }
    
    forgotPassword(email){
        return firebase.auth().sendPasswordResetEmail(email);
    }
}