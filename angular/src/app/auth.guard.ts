import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { Router } from '@angular/router';
import { UserService } from './user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: UserService, public router: Router) {} 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.auth.isAuthenticated()) { 
        
        this.router.navigate(['/signin']);   
        return true;   
      }
        
      return true; 
  } 
}   
 