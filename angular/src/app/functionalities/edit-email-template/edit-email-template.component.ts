import { Component, OnInit } from '@angular/core';

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

import { Router, ActivatedRoute } from '@angular/router';

import { EmailTemplate } from '../../email-template';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { EmailTemplateService } from '../../email-template.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MyPipePipe } from '../../my-pipe.pipe';




/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-edit-email-template',
  templateUrl: './edit-email-template.component.html',
  styleUrls: ['./edit-email-template.component.css']
})
export class EditEmailTemplateComponent implements OnInit {

  ckeditor_data:any;
  email_template:EmailTemplate;   
  value_name='';
  templateform:FormGroup;
  name:FormControl;
 data:any;

   
  constructor(private domSanitizer:DomSanitizer,private template_service:EmailTemplateService,private route:ActivatedRoute,private router:Router)  { } 
  
  ngOnInit() {    
    this.route.queryParams.subscribe(params => {
      this.value_name = params['name'];
     
  });  
  this.template_service.get_template(this.value_name).subscribe(

    (res:Response) => 
    { 
      console.log(res[0].html)
      this.data=((res[0].html));   
       this.data=new MyPipePipe(this.domSanitizer).transform(this.data);   

      
    console.log(this.data)                
    }  , 

    (err:Error)=>
    { 
      console.log(err);
    }

); 

  console.log(this.value_name)
     
    this.templateform=new FormGroup({  
      'name' :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)])
        });
   
    DecoupledEditor 
    .create( document.querySelector( '#editor' ) ,
  {     
        
    ckfinder: {       
    uploadUrl: 'http://localhost:8000/ckfinder/connector?command=QuickUpload&type=Images',   
    //uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'  
    }   
    //ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json
       
  }
 
)  
     .then( editor => { 

      this.ckeditor_data=editor; 
       
      console.log(this.ckeditor_data)
 
    const toolbarContainer = document.querySelector( '#toolbar-container' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        
    } )
    .catch( error => { 

        console.error( error );
 
    } ); 
  
  }


  
  
  matcher = new MyErrorStateMatcher(); 

get_data()
{
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
  (err:Error) =>
  { 
    console.log(err)
  }
); 
}


  getInnerHTMLValue(html){
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }


}
