import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

import { FormControl, FormGroup, Validators, Validator} from '@angular/forms';
import { FormGroupDirective, NgForm } from '@angular/forms';

import { EmailTemplateService } from '../../email-template.service';

import {ErrorStateMatcher} from '@angular/material/core';
import { CampaignService } from '../../campaign.service';
import { Router, ActivatedRoute } from '@angular/router';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  isLinear = true;
  NameFormGroup: FormGroup;
  name:FormControl;
  TemplateFormGroup: FormGroup;
  template_name:FormControl;
  data:any;
  value_name:string=''; 
  value_template_name:'';
  elem_id='';
  error_message:any;
  loader:boolean=false;
  
  constructor(private router:Router,private route:ActivatedRoute,private template_service:EmailTemplateService,private campaign_service:CampaignService) {}

  ngOnInit() {
    this.loader=true;
    this.NameFormGroup = new FormGroup({  
      'name' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),

    });

    this.TemplateFormGroup = new FormGroup({
   'template_name' : new FormControl(null,Validators.required)
    }); 

    this.template_service.get_index(localStorage.getItem('tenant_name')).subscribe(

      (res:Response) => 
      { 
        
        this.data=(res[0]);  
         
          this.loader=false;
        
      console.log(this.data)               
      }  ,
 
      (err:Error)=>
      { 
        console.log(err); 
      }

  );  
  }

  matcher = new MyErrorStateMatcher();   

    

 
  onsubmit()
  {
    
    console.log(this.value_template_name)
    this.campaign_service.start_campaign(this.value_name,this.value_template_name).subscribe(
      (res:Response)=>{
        this.router.navigate(['campaigns'],{
          relativeTo:this.route.parent
        });
      },  
      (err)=>{
        this.loader=false;  
        this.error_message=err.error;
        console.log(err)
        document.getElementById("modal_toggle").click(); 
      }
    );
    
  }    

  oncheck(name,id){  
    this.elem_id=id; 


    this.value_template_name=name;
  }
  view_template(name){
    this.router.navigate(['email_template',name],  
    {
      relativeTo:this.route.parent
    });  
  }

}
   