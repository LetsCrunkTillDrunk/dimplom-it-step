import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  errorMessage:string = "";
  successMessage:string = "";
  submitted: boolean = false;

  constructor(private authService:AuthService, private router:Router, private formBuilder:FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm:['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  get f() { return this.registerForm.controls; }
  /*
  register(form:FormGroup) {
    this.errorMessage = '';
    this.submitted = true;
    if(!form.invalid){
      if(form.value.password != form.value.confirm){
        this.errorMessage = "Passwords don't match";
        return;
      }
      this.authService.register(form.value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Your account has been created';
          this.router.navigate(['/user']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
      })
    }
    else{
      form.reset();
    }
  }
  */
}
