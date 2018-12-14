import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';


import { Router,NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { FormGroupDirective, NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { error } from 'protractor';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({ 
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinform: FormGroup;
  user:User; 
  loader:boolean=true;
  error_message:any;
  email:FormControl;
  password:FormControl;
  
  
  
  value_email = '';
  value_pwd = '';   
  

  constructor(private socialAuthService: AuthService,private router:Router,private user_service:UserService) { }

  ngOnInit() {
   
    this.loader=false;
    this.signinform = new FormGroup({
      
      'email' :new FormControl(null,[Validators.required,Validators.email]),
    
      'password' :new FormControl(null,[Validators.required]),

    });


  }
  matcher = new MyErrorStateMatcher();   
  
  
  ngOnDestroy()
  {
    this.loader=true;
    this.router.navigate(['signup']);
  }
  onSubmit()
  {  
    
    this.loader=true;
    this.user ={ email:this.signinform.get('email').value, password:this.signinform.get('password').value};
    this.user_service.authenticate(this.user).subscribe(  
      (res:Response) => 
    {   
    
      this.user_service.set_token(res);
      
      this.user_service.get_email();
    this.router.navigate([localStorage.getItem('email')]); 
       }   ,  
      (err) => {
        console.log(err.error)
        this.loader=false;
        this.error_message=err.error;
        document.getElementById("modal_toggle").click();
      },  
    ); 
         
  }
 
   
  public socialSignIn(socialPlatform : string) {
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
