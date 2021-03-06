import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'  
})
export class UserService {

  constructor(public jwtHelper: JwtHelperService,private http:HttpClient,private router:Router ) {
   
  } 

  public isAuthenticated() {
    const token = JSON.stringify(localStorage.getItem('access_token'));

    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token); 
  } 
   authenticate(user:User)  
   {   
     return this.http.post('http://localhost:8000/api/user_authenticate',user);
   }

    register(user:User)
   { 
    
    return this.http.post('http://localhost:8000/api/user_registration',user);
   
   }
   
   set_token(res)    
   {  
     localStorage.setItem('access_token',res);
   } 
   logout()     
   { 
     console.log("fucks u");
     localStorage.removeItem('access_token');
     this.router.navigate(['/signin']); 
   } 

   set_email(email)
   {
     console.log(email);
     localStorage.setItem('email',email); 
   }
   get_email()
   {
    this.http.get('http://localhost:8000/api/get_email').subscribe
    (
      (res:Response)=>
      { 
        this.set_email(res);
      },
      (err:Error)=>console.log(err)

    );
   }
  
   social_auth(user) 
   {
     
    return this.http.post('http://localhost:8000/api/auth_social',user).subscribe(  
      (res : Response) =>   { 
        this.set_token(res);     
        
        this.http.get('http://localhost:8000/api/get_email').subscribe
        (
          (res:Response)=>
          { 
            this.set_email(res);
          },
          (err:Error)=>console.log(err)
  
        );
      console.log(res); 
      this.router.navigate([localStorage.getItem('email')]);
  },  
      (err: Error) => console.log(JSON.stringify(err)) 
          
    ); 
   
   }

   public isAuthenticated1() {
    
    if(localStorage.getItem('access_token')!=null&&localStorage.getItem('email')!=null&&this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'))!=true)
    {
    return true;
  }  
  else{
  return false; 
  } 
   }
}
