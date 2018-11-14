import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../tenant.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router, NavigationExtras, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit { 

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
);

  dashboard:string; 
  email:string;
  data=new Array();
 
  constructor(private breakpointObserver: BreakpointObserver,private tenant_service:TenantService,private router:Router,private route: ActivatedRoute,) { }

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  ).subscribe(res  => {
      console.log("hello")
      console.log(this.router.url);
      this.data=[];

      if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/import_contacts')
      {
        this.data.push("Upload Contacts");
      }
      else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/campaigns'||this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/create_campaign')
      {
        this.data.push("Create New Campaign");
        this.data.push("Campaigns");
      }

      else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/email_templates'||this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/email_template_editor')
      {
        this.data.push("Email Template Editor");
        this.data.push("Email Templates");
      }
     else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/insights'||this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/insights_rss')
      {
        this.data.push("Campaigns Insights");
        this.data.push("RSS Feeds Insights");
      }
      
      
      else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/rss_to_emails'||this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/rss_to_emails_upload')
      {
        this.data.push("Upload RSS Feed");
        this.data.push("RSS Feeds");
      }
       
      else if(this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/image_gallery'||this.router.url=='/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/image_upload')
      {
        this.data.push("Upload Image");
        this.data.push("Images");
      }
 

      
  });  
    this.getdata();
    this.email=localStorage.getItem('email')
 
    this.dashboard=localStorage.getItem('tenant_name');
    console.log(this.dashboard)
    this.router.navigate(['dashboard-panel'], 
    { relativeTo: this.route});

  }
  ngAfterContentInit()
{  
  console.log(this.router.url)
} 

  ontenant_logout() 
  {
    
    this.tenant_service.logout_tenant();
  } 

  import_contacts()  
  {
    
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
    
    this.router.navigate(['insights'],
    { relativeTo: this.route});
  }
  
  rss_to_emails() 
  {
    
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
    
    this.router.navigate(['dashboard-panel'],
    { relativeTo: this.route}); 
  }

  getdata()
  {
     

    if(this.router.url=='/ali@test.com/sample/dashboard-panel')
    {
      console.log("yes")
    }
  }

 
 side_nav(name)
 {
  
  if(name=="Upload Contacts")
  {
    document.getElementById(name).setAttribute('class','active-link');  
  }
 else if(name=="Create New Campaign")
  {
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['create_campaign'],{
      relativeTo:this.route
    });
  }
  else if(name=="Campaigns")
  {
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['campaigns'],{
      relativeTo:this.route
    });
  }

  else if(name=="Email Template Editor")
  {
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['email_template_editor'],{
      relativeTo:this.route
    });
  }
 
 else if(name=="Email Templates")
  {
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['email_templates'],{
      relativeTo:this.route
    });
  }
  
  else if(name=="Campaigns Insights")  
  { 
    
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['insights'],{
      relativeTo:this.route
    });
  }

  else if(name=="RSS Feeds Insights")  
  {
    console.log(false)
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['insights_rss'],{
      relativeTo:this.route
    });
  } 
  
  else if(name=="Upload RSS Feed")  
  {
    console.log(false)
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['rss_to_emails_upload'],{
      relativeTo:this.route
    });
  } 
  else if(name=="RSS Feeds")  
  {
    console.log(false)
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['rss_to_emails'],{
      relativeTo:this.route
    });
  }
  else if(name=="Upload Image")  
  {
    console.log(false)
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['image_upload'],{
      relativeTo:this.route
    });
  }
  else if(name=="Images")  
  {
    console.log(false)
    document.getElementById(name).setAttribute('class','active-link');  
    this.router.navigate(['image_gallery'],{
      relativeTo:this.route
    }); 
  }
 } 
}
  
  

