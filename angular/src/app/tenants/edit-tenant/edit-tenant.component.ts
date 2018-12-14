import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Tenant } from '../../tenant';
import { Router } from '@angular/router';
import { TenantService } from '../../tenant.service';
import { UserService } from '../../user.service';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  
  }
} 

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.scss'] 
})
export class EditTenantComponent implements OnInit {

  tenant_form:FormGroup; 
  tenant_name:FormControl; 
  value_name='';
  tenant:Tenant; 
  error_message:any;
  error_message1:any;
  loader:boolean=false;
  url="/"+localStorage.getItem('email');
  constructor(private router:Router,
    private tenant_service:TenantService,
    private user_service:UserService) { }


  ngOnInit() {
  

    this.tenant_form=new FormGroup(  
      {
          'name':new FormControl(null,[Validators.required,
            Validators.minLength(4),Validators.maxLength(25),
 
          ])
       }
    );
     
  }

  matcher = new MyErrorStateMatcher();  

    
    
  onEdit_Business()
   {

    this.tenant ={ name:this.tenant_form.get('name').value};

    this.tenant_service.update_tenant(this.tenant).
    subscribe(
      (res:Response)=>
      { 
        console.log(res)
        localStorage.setItem('tenant_name',this.tenant.name);  
        this.router.navigate([localStorage.getItem('email')]);
         
      },
      (err)=>
      {
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
    ); 

}

 
onLogout()
{
  console.log("a ")
  this.user_service.logout();
}


onBack()
{
  this.router.navigate([localStorage.getItem('email')]);
}


}
