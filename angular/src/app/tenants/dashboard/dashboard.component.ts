import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../tenant.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard:string;
  

  constructor(private tenant_service:TenantService,private router:Router,private route: ActivatedRoute,) { }

  ngOnInit() {
 
    this.dashboard=localStorage.getItem('tenant_name');
    console.log(this.dashboard)
    this.router.navigate(['dashboard-panel'], 
    { relativeTo: this.route});

  } 

  ontenant_logout() 
  {
    
    this.tenant_service.logout_tenant();
  } 

  import_contacts()  
  {
    console.log(this.route)
    this.router.navigate(['import_contacts'],
    { relativeTo: this.route});
  }


       email_templates_editor() 
  {
    //console.log(this.route)
    this.router.navigate(['email_template_editor'],
    { relativeTo: this.route});
  }
  
   
  email_templates_index() 
  {
    //console.log(this.route)
    this.router.navigate(['email_templates'],
    { relativeTo: this.route});
  }
  campaigns() 
  {
    console.log(this.route)
    this.router.navigate(['campaigns'],
    { relativeTo: this.route});
  }
  create_campaign() 
  {
    console.log(this.route)
    this.router.navigate(['create_campaign'],
    { relativeTo: this.route});
  }
  insights() 
  {
    console.log(this.route)
    this.router.navigate(['insights'],
    { relativeTo: this.route});
  }
  
  rss_to_emails() 
  {
    console.log(this.route)
    this.router.navigate(['rss_to_emails'],
    { relativeTo: this.route});
  }
 
  
  image_gallery() 
  {
    this.router.navigate(['image_gallery'],
    { relativeTo: this.route});
  }
  dashboard_panel() 
  {
    console.log(this.route)
    this.router.navigate(['dashboard-panel'],
    { relativeTo: this.route}); 
  }

}
