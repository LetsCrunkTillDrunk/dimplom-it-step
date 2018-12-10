import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = null;
  opened = false;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat'
  watcher: Subscription;

  constructor(private authService:AuthService, private userService:UserService, private fireAuth: AngularFireAuth,
    private categoryService:CategoryService, private router:Router) { 
      this.userService.currentUser.then((user)=> 
        {this.user = user}, 
        error=>{});
  }
  
  ngOnInit() {
  }

  logout(){
    this.authService.logout()
      .then((res) => {
        location.reload();
        this.router.navigate(['/categories']);
      }, (error) => {
        console.log("Logout error", error);
    });
  }

  login(){
    this.userService.ensureLogin();
  }}
