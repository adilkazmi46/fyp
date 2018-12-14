import { Component, OnInit } from '@angular/core';
import { EmailTemplateService } from '../../email-template.service';
import { forEach } from '@angular/router/src/utils/collection';
import { EmailTemplate } from '../../email-template';

import { Router, ActivatedRoute } from '@angular/router'; 


@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.css']
})
export class EmailTemplatesComponent implements OnInit {
  names:any;   
  html:any;   
  data:any;
  deleted:boolean;
  error:boolean;  
  error_message:any;

  constructor(private template_service:EmailTemplateService,private router:Router,private route:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.getData();
  }
  
  ondelete(name) 
  { 
console.log(name);
this.template_service.delete_template(name).
subscribe(
(res)=>{  
  console.log(res);
},
(err)=>{
  console.log(err)
}
   
);
this.getData();
  } 

  onedit(name)
  {
    console.log(name);
    this.router.navigate(['edit_email_template/'],
    {
      queryParams:{name:name},  
      relativeTo:this.route.parent}
    )
  } 

  

 getData()
 {
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

 oncreate()
 {
   this.router.navigate(['email_template_editor'],
   {relativeTo:this.route.parent})
 }

}
