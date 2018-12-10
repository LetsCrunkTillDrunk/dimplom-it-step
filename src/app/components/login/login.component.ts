import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  errorMessage:string = "";

  signInForm: FormGroup;
  signUpForm: FormGroup;
  forgetPasswordForm: FormGroup;

  constructor(private authService:AuthService, private router:Router, 
    private formBuilder:FormBuilder, private dialogRef: MatDialogRef<LoginComponent>) { 
    this.createForm();
  }

  ngOnInit() {
    $(function() {

      $(".input input").focus(function() {
   
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "18px",
               "font-size": "18px",
               "font-weight": "100",
               "top": "0px"
            })
            $(".spin", this).css({
               "width": "100%"
            })
         });
      }).blur(function() {
         $(".spin").css({
            "width": "0px"
         })
         
         if ($(this).val() == "") {
            $(this).parent(".input").each(function() {
               $("label", this).css({
                  "line-height": "60px",
                  "font-size": "24px",
                  "font-weight": "300",
                  "top": "10px"
               })
            });
            
         }
      });
   
      $(".button").click(function(e) {
         var pX = e.pageX,
            pY = e.pageY,
            oX = parseInt($(this).offset().left + ""),
            oY = parseInt($(this).offset().top  + "");
   
         $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
         $('.x-' + oX + '.y-' + oY + '').animate({
            "width": "500px",
            "height": "500px",
            "top": "-250px",
            "left": "-250px",
         }, 600);
         $("button", this).addClass('active');
      })
   
      $(".alt-2").click(function() {
         if (!$(this).hasClass('material-button')) {
            $(".shape").css({
               "width": "100%",
               "height": "100%",
               "transform": "rotate(0deg)"
            })
   
            setTimeout(function() {
               $(".overbox").css({
                  "overflow": "initial"
               })
            }, 600)
   
            $(this).animate({
               "width": "140px",
               "height": "140px"
            }, 500, function() {
               $(".box").removeClass("back");
   
               $(this).removeClass('active')
            });
   
            $(".overbox .title").fadeOut(300);
            $(".overbox .input").fadeOut(300);
            $(".overbox .button").fadeOut(300);
   
            $(".alt-2").addClass('material-buton');
         }
      })
   
      $(".material-button").click(function() {
   
         if ($(this).hasClass('material-button')) {
            setTimeout(function() {
               $(".overbox").css({
                  "overflow": "hidden"
               })
               $(".box").addClass("back");
            }, 200)
            $(this).addClass('active').animate({
               "width": "700px",
               "height": "700px"
            });
   
            setTimeout(function() {
               $(".shape").css({
                  "width": "50%",
                  "height": "50%",
                  "transform": "rotate(45deg)"
               })
   
               $(".overbox .title").fadeIn(300);
               $(".overbox .input").fadeIn(300);
               $(".overbox .button").fadeIn(300);
            }, 700)
   
            $(this).removeClass('material-button');
   
         }
   
         if ($(".alt-2").hasClass('material-buton')) {
            $(".alt-2").removeClass('material-buton');
            $(".alt-2").addClass('material-button');
         }
   
      });
   
   });
  }

  createForm(){
  
   this.signInForm = this.formBuilder.group({
     signInEmail: ['', Validators.compose([Validators.required, Validators.email])],
     signInPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
   });

   this.signUpForm = this.formBuilder.group({
     signUpEmail: ['', Validators.compose([Validators.required, Validators.email])],
     signUpPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     signUpConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
   }, {validator:checkPasswordsValidator});

   this.forgetPasswordForm = this.formBuilder.group({
     forgetEmail: ['', Validators.compose([Validators.required, Validators.email])]
   });
  }
  

  loginWithFacebook() {
    this.authService.signInWithFacebook()
      .then(res => {
        location.reload();
        this.router.navigate(['/categories']);
        this.dialogRef.close();
      }, err => console.log(err)
    )
  }

  loginWithTwitter() {
    this.authService.signInWithTwitter()
      .then(res => {
        location.reload();
        this.router.navigate(['/categories']);
        this.dialogRef.close();
      }, err => console.log(err)
    )
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle()
      .then(res => {
        location.reload();
        this.router.navigate(['/categories']);
        this.dialogRef.close();
      }, err => console.log(err)
    )
  }

  signInWithEmail(){
    this.authService.login(this.signInForm.get('signInEmail').value, this.signInForm.get('signInPassword').value)
    .then((user)=>{
      location.reload();
      this.router.navigate(['/categories']);
      this.dialogRef.close();
    });
  }

  signUpWithEmail(){
    this.authService.register(this.signUpForm.get('signUpEmail').value, this.signUpForm.get('signUpPassword').value)
    .then((user)=>{
      location.reload();
      this.router.navigate(['/categories']);
      this.dialogRef.close();
    });
  }

  forgotPasswordSubmit() {
    this.authService.forgotPassword(this.forgetPasswordForm.get('forgetPassword').value)
       .then((a: any) => {
         console.log(a);
       },
       (error: Error) => {
         console.log(error);
       });
  }
}

function checkPasswordsValidator (fg: FormGroup): {[key: string]: boolean} {

  if (fg.get('signUpPassword').value !== fg.get('signUpConfirm').value)
    return {'passwordsDontMatch': true}

  return null;
}
