import { Component, OnInit } from '@angular/core';
import { RssFeedsService } from '../../rss-feeds.service';


import { FormControl, FormGroup, Validators, Validator} from '@angular/forms';
import { FormGroupDirective, NgForm } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';



import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { JsonPipe } from '@angular/common';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  
@Component({
  selector: 'app-rss-to-emails',
  templateUrl: './rss-to-emails.component.html',
  styleUrls: ['./rss-to-emails.component.scss']
})
export class RssToEmailsComponent implements OnInit {

  data:any;

  value_name = '';
  value_name_new = '';
  value_url = '';
  value_url_new = '';
  value_name_old='';
  value_url_old='';
  url_regex='^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
  rssform: FormGroup; 
  rss_edit_form: FormGroup; 
  name:FormControl;  
  url:FormControl;  
  name_new:FormControl;
  url_new:FormControl;
  error_message:any;
  show:boolean=false;
  
  constructor(private feed_service:RssFeedsService,private router:Router,private route:ActivatedRoute) { }

 
  ngOnInit() {
    this.show=true;
    this.rssform= new FormGroup(
      {
        'name':new FormControl(null,[Validators.required,Validators.maxLength(25),Validators.minLength(3)]),
        'url' : new FormControl(null,[Validators.required,Validators.pattern(this.url_regex)])
      } 
      );
      this.rss_edit_form= new FormGroup(
        {
          'name_new':new FormControl(null,[Validators.required,Validators.maxLength(25),Validators.minLength(3)]),
          'url_new' : new FormControl(null,[Validators.required,Validators.pattern(this.url_regex)])
        } 
        ); 

        this.getData();
        this.show=false;
  }

  

  onSubmit()
  {
    this.show=true;
    this.feed_service.rss_feed_create(this.rssform.get('name').value,this.rssform.get('url').value).subscribe
    (
      (res)=>{
        if(res==true)
        {
       this.router.navigate(['rss_to_emails'],{
         relativeTo:this.route.parent
       })
        }
        else{
          if(res[0].feed_url!=null)
          {
          this.error_message=res[0].feed_url;
          } 
          else{
            this.error_message="something went wrong";
          }
      
          document.getElementById("modal_toggle").click();
                
              }
              console.log(res[0].feed_url)
},
      (err:Error)=>
      {  
        
        this.error_message=err;
        document.getElementById("modal_toggle").click();
      }
    );

    this.rssform.reset();
    this.getData();
    this.show=false;
  }


  setvalue(name,url){
    this.value_name_old=name;
    this.value_url_old=url;
    this.value_name_new=name;
    this.value_url_new=url;
  }
 
  getData()
  {
    
   // this.rssform.reset();
    this.feed_service.rss_feeds_index().
    subscribe(
      (res:Response)=>{
 
       console.log(((res[0])));        
       this.data=(res[0]);   
      }, 
      (err:Error)=>{
        console.log(err)
      } 
    );
  
  }
 


}
