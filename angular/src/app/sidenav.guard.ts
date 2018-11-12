import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SidenavItemsService } from './sidenav-items.service';
import { Route } from '@angular/compiler/src/core';
import { SidenavItemsComponent } from './sidenav-items/sidenav-items.component';

@Injectable({ 
  providedIn: 'root'
}) 
export class SidenavGuard implements CanActivate {
  constructor(public items:SidenavItemsService,public router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var arr=new Array();
      if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/import_contacts')
    {
      arr=[];
      arr.push('upload');     
      this.items.setData(arr);
      console.log(this.items.data); 
    }
    else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/campaign')
    {
      arr=[];
      arr.push('Campaigns');
      arr.push('Create new Campaign');
      this.items.setData(arr);
    }
    else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/email_template')
    {
      arr=[];
      arr.push('Email Templates');
      arr.push('Email Template Editor');
      this.items.setData(arr);
    } 
   else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/insights')
    {
      arr=[];
      arr.push('Campaigns');
      arr.push('RSS Feeds');
      this.items.setData(arr);
    }
    
    
    else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/rss_to_emails')
    {
      arr=[]; 
      arr.push('RSS Feeds');
      arr.push('Upload RSS Feeds');
      this.items.setData(arr); 
    } 

    else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/image_gallery')
    {
      arr=[];
      arr.push('Images');
      arr.push('Upload Image');   
      this.items.setData(arr);
    } 
    console.log(this.router.url);
    console.log('/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/image_gallery')
    console.log(arr);
      return true;
  }
}        
