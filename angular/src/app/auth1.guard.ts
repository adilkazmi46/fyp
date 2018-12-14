import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {
  constructor(public auth: UserService, public router: Router) {} 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.auth.isAuthenticated1())  
      if (this.auth.isAuthenticated1()) { 
        console.log("fuck fuck fuck")
        
        this.router.navigate(['/'+localStorage.getItem('email')]);   
        return true;   
      }
      console.log("fuck fuck fuck1")
      return true;   
  } 
}
  