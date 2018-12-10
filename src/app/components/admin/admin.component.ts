import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private user: User;

  constructor(private userService: UserService) {
    this.userService.currentUser.then((user)=>{
      this.user = user;
    });
   }

  ngOnInit() {
  }

}
