import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { EmailTemplateService } from 'src/app/email-template.service';

@Component({
  selector: 'app-viewtemplate',
  templateUrl: './viewtemplate.component.html',
  styleUrls: ['./viewtemplate.component.scss']
})
export class ViewtemplateComponent implements OnInit {

  template_name:string='';
  template_html:any='';
  error_message:any;  
  constructor(private route:ActivatedRoute,private router:Router,private template_servive:EmailTemplateService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let name = params['name']; 
      this.get_template(name);  
  });
  }

  get_template(name){ 
    console.log(name)
this.template_servive.get_template(name).subscribe(
  (res) =>{
    console.log(res)
   this.template_name=name; 
   this.template_html=res;

  },
  (err:Error)=>{  
    console.log(err)  
   this.error_message=err;
  }
);
  }
}
