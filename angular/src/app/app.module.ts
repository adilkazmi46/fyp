import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; 
import { MaterialModule } from './material.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router'; 
import { JwtModule } from '@auth0/angular-jwt';
import { TenantsModule } from './tenants/tenants.module';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';


@NgModule({ 
  declarations: [ 
    AppComponent,
    SigninComponent, 
    SignupComponent,  
    PagenotfoundComponent,  
    
     
  ], 
  imports: [
    
    HttpClientModule,
    JwtModule.forRoot({ 
      config: { 
        throwNoTokenError: false,
         tokenGetter: () => {
         
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8000'],  
        blacklistedRoutes: ['localhost:8000/api/user_authenticate',
        'localhost:8000/api/user_registration',
        'localhost:8000/api/social_auth',  
        'localhost:8000/api/callback/{service},'] 
      }  
    }),
    RouterModule.forRoot([
    {
      path:'signin',
      component:SigninComponent

    }, 
    {
      path:'signup',
      component:SignupComponent

    },  
    { 
      path:'',   
      redirectTo:'/signin', 
      pathMatch:'full', 
    },
     
    {   
      path: ':email',  
      loadChildren: ()=> TenantsModule, 
    },
     

    {
      path:'**',
      component:PagenotfoundComponent
    }
           



    ]),
    BrowserModule, 
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule, 
    
  ],
  providers: [AuthGuard,UserService],
  bootstrap: [AppComponent] ,
})
export class AppModule { }
  