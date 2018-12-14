import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';

import { Tenant } from '../../tenant';
import { TenantService } from '../../tenant.service';
import { UserService } from '../../user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  
  tenant_form:FormGroup; 
  tenant_name:FormControl; 
  value_name='';
  tenant:Tenant; 
  url="/"+localStorage.getItem('email');
  error_message:any;
  error_message1:any;
  loader:boolean=false;
  constructor(private router:Router,private tenant_service:TenantService,private user_service:UserService) { }

 
  ngOnInit() { 
     this.loader=false;
    this.tenant_form=new FormGroup( 
      {
          'name':new FormControl(null,[Validators.required,
            Validators.minLength(4),Validators.maxLength(25),

          ])
       }
    );
 
  }
  
  matcher = new MyErrorStateMatcher();  

    
   
  onAdd_Business()
   {
     this.loader=true;
    this.tenant ={ name:this.tenant_form.get('name').value};
    this.tenant_service.create_tenant(this.tenant).subscribe(
      (res:Response)=> 
      {
        this.loader=false;
          this.tenant_service.set_tenant(res);
          this.router.navigate([localStorage.getItem('email'),localStorage.getItem('tenant_name')]);

      },
      (err) => {
       
        this.loader=false;  
        if(err.error[0].name!=undefined||err.error[0].name!=null)
        {   
        this.error_message1=err.error[0].name;
        }    
       
        if(typeof(err)!='object')
        {
          console.log(typeof(err))   
          this.error_message=err;
        }
        document.getElementById('modal_toggle_err').click();
      }
    );;  

}
onBack() 
{
  this.router.navigate([localStorage.getItem('email')]);
}

  onLogout()
  {
    console.log("a ")
    this.user_service.logout(); 
  }
  
  tenant_signout() 
  {
    localStorage.removeItem('name');
    this.router.navigate(['/tenant/admin-panel']);
  }

}
 