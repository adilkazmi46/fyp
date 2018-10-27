import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';


import { Router } from '@angular/router';

import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { FormGroupDirective, NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinform: FormGroup;
  user:User; 
 
   
  email:FormControl;
  password:FormControl;
  
  
  
  value_email = '';
  value_pwd = '';   
  

  constructor(private router:Router,private user_service:UserService) { }

  ngOnInit() {
 
    this.signinform = new FormGroup({
      
      'email' :new FormControl(null,[Validators.required,Validators.email]),
    
      'password' :new FormControl(null,[Validators.required]),

    });


  }
  matcher = new MyErrorStateMatcher();   
  
  
  ngOnDestroy()
  {
    this.router.navigate(['signup'])
  }
  onSubmit()
  {  
    
    this.user ={ email:this.signinform.get('email').value, password:this.signinform.get('password').value};
    this.user_service.authenticate(this.user);      
  
  }

   
}
