import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

import { FormControl, FormGroup, Validators, Validator} from '@angular/forms';
import { FormGroupDirective, NgForm } from '@angular/forms';

import { EmailTemplateService } from '../../email-template.service';

import {ErrorStateMatcher} from '@angular/material/core';
import { CampaignService } from '../../campaign.service';



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
  
  constructor(private template_service:EmailTemplateService,private campaign_service:CampaignService) {}

  ngOnInit() {
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
        

        
      console.log(this.data)               
      }  ,
 
      (err:Error)=>
      { 
        console.log(err); 
      }

  );  
  }

  matcher = new MyErrorStateMatcher();   

  

  oncheck(name)
  {
    console.log(name)
   this.value_template_name=name;  
   console.log(this.value_template_name)
  }
 
  onsubmit()
  {
    console.log(this.value_template_name)
    this.campaign_service.start_campaign(this.value_name,this.value_template_name);
  }
}
   