import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.css']
})
export class DashboardPanelComponent implements OnInit {


  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  rss_insights()
  {
   this.router.navigate(['insights_rss'],
   {
     relativeTo:this.route.parent
   })
  }

  campaigns_insights()
  {
   this.router.navigate(['insights_campaigns'],
   {
     relativeTo:this.route.parent
   })
  }

  campaigns()
  {
   this.router.navigate(['campaigns'],
   {
     relativeTo:this.route.parent
   })
  }
 
  new_campaigns()
  {
   this.router.navigate(['create_campaign'],
   {
     relativeTo:this.route.parent
   })
  }


  rss_feeds()
  {
   this.router.navigate(['rss_to_emails'],
   {
     relativeTo:this.route.parent
   })
  }

  upload_rss()
  {
   this.router.navigate(['rss_to_emails_upload'],
   {
     relativeTo:this.route.parent
   })
  }

  templates()
  {
   this.router.navigate(['email_templates'],
   {
     relativeTo:this.route.parent
   })
  }

  template_editor()
  {
   this.router.navigate(['email_template_editor'],
   {
     relativeTo:this.route.parent
   })
  }

  images()
  {
   this.router.navigate(['image_gallery'],
   {
     relativeTo:this.route.parent
   })
  }

  upload_images()
  {
   this.router.navigate(['image_upload'],
   {
     relativeTo:this.route.parent
   })
  }

  import_contacts()
  {
   this.router.navigate(['import_contacts'],
   {
     relativeTo:this.route.parent
   })
  }



}
