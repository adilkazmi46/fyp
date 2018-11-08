import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
 
@Injectable({
  providedIn: 'root'
})
export class TenantGuard implements CanActivate {
  constructor(public tenant: TenantService, public router: Router) {} 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     console.log(this.tenant.isAuthenticated())
      if (!this.tenant.isAuthenticated()) { 
        
        this.router.navigate([localStorage.getItem('email')]);   
        return true;   
      }
        
      return true;  
  }  
    
  }

