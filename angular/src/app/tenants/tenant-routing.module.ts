import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant/tenant.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { ImportContactComponent } from '../functionalities/import-contact/import-contact.component';
import { CampaignsComponent } from '../functionalities/campaigns/campaigns.component';
import { RssToEmailsComponent } from '../functionalities/rss-to-emails/rss-to-emails.component';
import { InsightsComponent } from '../functionalities/insights/insights.component';
import { EmailTemplateComponent } from '../functionalities/email-template/email-template.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';
import { ImageGalleryComponent } from '../functionalities/image-gallery/image-gallery.component';
import { EmailTemplatesComponent } from '../functionalities/email-templates/email-templates.component';
import { EditEmailTemplateComponent } from '../functionalities/edit-email-template/edit-email-template.component';
import { CampaignIndexComponent } from '../functionalities/campaign-index/campaign-index.component';
import { TenantGuard } from '../tenant.guard';
import { SidenavGuard } from '../sidenav.guard';
import { InsightsRssComponent } from '../functionalities/insights-rss/insights-rss.component';
import { RssToEmailsIndexComponent } from '../functionalities/rss-to-emails-index/rss-to-emails-index.component';
import { ImageGalleryIndexComponent } from '../functionalities/image-gallery-index/image-gallery-index.component';

@NgModule({
  imports: [  
    CommonModule,
 
    RouterModule.forChild([
  

      { 
        path:'AddBusiness',
        component:TenantComponent,
        pathMatch:'full',
        canActivate:[AuthGuard],   

      },
      
      
      { 
        path:'EditBusiness',
        component:EditTenantComponent,
        pathMatch:'full',
        canActivate:[AuthGuard],   
      }, 
  

  
      {  
  path:':name',    
  component:DashboardComponent, 
  canActivate:[TenantGuard,AuthGuard],     
  
  children:[ 
       
    {
      path:'image_gallery',  
      component:ImageGalleryIndexComponent, 
      
    },
    {
      path:'image_upload',  
      component:ImageGalleryComponent, 
      
    },  
     
    { 
      path:'import_contacts',
      component:ImportContactComponent,     
      
    },
    {
      path:'create_campaign', 
      component:CampaignsComponent,
      
    } ,
    {
    path:'campaigns',
    component:CampaignIndexComponent,
    
    },
    {
    path:'rss_to_emails',
    component:RssToEmailsIndexComponent,
    
    },
    {
      path:'rss_to_emails_upload',
      component:RssToEmailsComponent,
      
      }, 
    { 
      path:'insights_campaigns',
      component:InsightsComponent,
      
    },
    {
      path:'insights_rss',
      component:InsightsRssComponent,
      
    },
    
    {
      path:'email_template_editor',
      component:EmailTemplateComponent,
      
    },
    
    {
      path:'email_templates',
      component:EmailTemplatesComponent,
      
    }, 
    {
      path: 'edit_email_template',
      component : EditEmailTemplateComponent ,
      
    },
    {  
      path:'dashboard-panel',
      component:DashboardPanelComponent,
      
    },
  ]
   } ,
  
 { 
   path:'',
   component:AdminPanelComponent, 
   canActivate:[AuthGuard] , 
   pathMatch:'full',
 }, 

 

    ]),
  ],
  declarations: [],
  exports:[RouterModule]
})
export class TenantRoutingModule { }
