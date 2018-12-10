import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router, private userService:UserService){}

    canActivate(){
        if (!this.userService.isAuthenticated){
            this.userService.showLogin();
            return false;
        }
        return true;
    }
}