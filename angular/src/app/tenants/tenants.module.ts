import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComponent } from './tenant/tenant.component';

import { TenantRoutingModule } from './tenant-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TenantIndexComponent } from './tenant-index/tenant-index.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';

import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import { NavigationComponent } from './navigation/navigation.component';
import { ImportContactComponent } from '../functionalities/import-contact/import-contact.component';
import { RouterModule } from '@angular/router';
import { EmailTemplateComponent } from '../functionalities/email-template/email-template.component';
import { CampaignsComponent } from '../functionalities/campaigns/campaigns.component';
import { RssToEmailsComponent } from '../functionalities/rss-to-emails/rss-to-emails.component';
import { InsightsComponent } from '../functionalities/insights/insights.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageGalleryComponent } from '../functionalities/image-gallery/image-gallery.component';
import { EmailTemplatesComponent } from '../functionalities/email-templates/email-templates.component';
import { MyPipePipe } from '../my-pipe.pipe';

import { EditEmailTemplateComponent } from '../functionalities/edit-email-template/edit-email-template.component';
import { CampaignIndexComponent } from '../functionalities/campaign-index/campaign-index.component';
  



  
@NgModule({
  imports: [
    CKEditorModule, 
    
    CommonModule,
    TenantRoutingModule,   
    MaterialModule,   
    FormsModule,
    ReactiveFormsModule,   
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule, 
    MatToolbarModule, 
    MatSidenavModule,
    MatListModule, 
    
  ],     
  exports:[ 
  TenantRoutingModule,
  ],
  declarations: [TenantComponent, DashboardComponent, TenantIndexComponent, AdminPanelComponent, EditTenantComponent,  NavigationComponent, ImportContactComponent, EmailTemplateComponent, CampaignsComponent, RssToEmailsComponent, InsightsComponent, DashboardPanelComponent, ImageGalleryComponent, EmailTemplatesComponent, MyPipePipe, EditEmailTemplateComponent, CampaignIndexComponent, ]
})
export class TenantsModule { }
 