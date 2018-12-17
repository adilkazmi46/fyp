import { Component, OnInit } from '@angular/core'; 

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

import { Router, ActivatedRoute } from '@angular/router';

import { EmailTemplate } from '../../email-template';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { EmailTemplateService } from '../../email-template.service';
import { ImagesService } from '../../images.service';

 
import * as $ from 'jquery';

import 'jquery-ui/ui/widgets/draggable';
  



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit { 
 
  ckeditor_data:any;
  email_template:EmailTemplate;   
  value_name='';
  templateform:FormGroup;
  name:FormControl;  
  data:any; 
  save_message:string='';
  loader:boolean=false;
  error_message:any;
constructor(private image_service:ImagesService,private template_service:EmailTemplateService,private route:ActivatedRoute,private router:Router)  { 
  
} 
  

    
  ngOnInit() {      
    this.loader=true;
    this.image_service.get_images().
    subscribe(
      (res:Response)=> 
      {  
      this.data=Object.entries(res[0]);
      
      console.log(this.data)
      this.loader=false;
      },
      (err)=>{  
       console.log(err);
       this.loader=false;  
        this.error_message=err.error; 
        console.log(err)
        document.getElementById("modal_toggle").click();       
      }

    );
    
    this.templateform=new FormGroup({  
      'name' :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)])
        });
   
    DecoupledEditor 
    .create( document.querySelector( '#editor' ) ,
  {     
    removePlugins: [ 'Insert Image' ],
    ckfinder: {       
    uploadUrl: 'http://localhost:8000/ckfinder/connector?command=QuickUpload&type=Images',   
    //uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'  
    }   
    //ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json
       
  }
  
)  
     .then( editor => { 

     
    this.ckeditor_data=editor;
      const toolbarContainer = document.querySelector( '#toolbar-container' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
      
        
        
        //this.ckeditor_data = DecoupledEditor.getdata(); 
      //  console.log(editor.data);
    } )
    .catch( error => { 

        console.error( error );
        this.loader=false;  
        this.error_message=error;
        
        document.getElementById("modal_toggle").click(); 
    } );  

  }


  
 
   
  
  matcher = new MyErrorStateMatcher(); 

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
get_data()
{
  this.loader=true;
this.email_template ={  
   name:this.templateform.get('name').value,
html:this.ckeditor_data.getData(),
tenant_name:localStorage.getItem('tenant_name')
};
 
console.log(this.email_template);

this.template_service.save_template(this.email_template).
subscribe(
  (res:Response)=>{
    console.log(res)
    this.router.navigate(['email_templates'],
    {relativeTo:this.route.parent}); 
  },
  (err) =>
  { 
    this.loader=false;  
        this.error_message=err.error;
        console.log(err) ;
        document.getElementById("modal_toggle_err").click(); 
  }
);   
}  
  


image_upload()
{
document.getElementById('modal_toggle').click();

}   
img_nav(x)
{ 
  if(x==true)
  {
    this.router.navigate(['image_upload'],
    {relativeTo:this.route.parent});  
  
  }
  else if(x==false)
  {
   }
}
}

  
      