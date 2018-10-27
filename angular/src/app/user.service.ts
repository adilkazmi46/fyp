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

  public isAuthenticated(): boolean {
    const token = JSON.stringify(localStorage.getItem('access_token'));
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token); 
  } 
   authenticate(user:User) 
   {   
     return this.http.post('http://localhost:8000/api/user_authenticate',user).subscribe(  
      (res:Response) => 
    {  
      this.set_token(res);
      console.log(res); 
      this.http.get('http://localhost:8000/api/get_email').subscribe
      (
        (res:Response)=>
        {
          this.set_email(res);
        },
        (err:Error)=>console.log(err)

      );
    this.router.navigate([localStorage.getItem('email')]); 
        
  }    
      ,  
      (err:Error) => console.log(err), 
    ); 
   }

    register(user:User)
   { 
    
    return this.http.post('http://localhost:8000/api/user_registration',user).subscribe(  
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
  




}
