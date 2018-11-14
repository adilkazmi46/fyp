import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, Validator} from '@angular/forms';
import { FormGroupDirective, NgForm } from '@angular/forms';


import { Router } from '@angular/router';



import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../user';
import { UserService } from '../user.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider 
} from 'angular-6-social-login';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] 
})
export class SignupComponent implements OnInit  {

  value_name = '';
  value_email = '';
  value_pwd = ''; 
  value_pwdc= '';
  
  
  /** Error when invalid control is dirty, touched, or submitted. */
  
  
  /** @title Input with a custom ErrorStateMatcher */
  
  
  
  signupform: FormGroup; 
  name:FormControl;  
  email:FormControl;
  password:FormControl;
  password_confirmation:FormControl;
  user:User;
     
  constructor(private socialAuthService: AuthService,private router:Router,private user_service:UserService) { }
  
 
 
  
  ngOnInit() {

    this.signupform = new FormGroup({

      'name' :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
      'email' :new FormControl(null,[Validators.required,Validators.email]),
      'password' :new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(25)]),
      'password_confirmation' :new FormControl(null,[Validators.required]), 
          
    },  
    {validators: this.passwordMatchValidator}
       
  );
  } 
  
  passwordMatchValidator(g: FormGroup) {
  
    return g.get('password').value === g.get('password_confirmation').value
       ? null : {'mismatch': true};
 }
  
  matcher = new MyErrorStateMatcher();   
  
   
 
 ngOnDestroy()    
 {
   this.router.navigate(['signin'])
  }

  
 

 
  onSubmit()
  {

    this.user ={
    name:this.signupform.get('name').value ,
    email:this.signupform.get('email').value, 
    password:this.signupform.get('password').value,
    password_confirmation:this.signupform.get('password_confirmation').value,
    };

     console.log(this.user.email);
     console.log(this.user.password); 
     console.log(this.user.name); 
       
    this.user_service.register(this.user);
    
  } 
  
  
  public socialSignup(socialPlatform : string) {
    let socialPlatformProvider;  
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
         this.user_service.social_auth(userData);     
        // Now sign-in with userData
        // ...
            
      }
    );
  }


}


 