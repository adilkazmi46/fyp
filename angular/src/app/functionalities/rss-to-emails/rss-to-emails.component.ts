import { Component, OnInit } from '@angular/core';
import { RssFeedsService } from '../../rss-feeds.service';


import { FormControl, FormGroup, Validators, Validator} from '@angular/forms';
import { FormGroupDirective, NgForm } from '@angular/forms';


import { Router } from '@angular/router';



import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  
@Component({
  selector: 'app-rss-to-emails',
  templateUrl: './rss-to-emails.component.html',
  styleUrls: ['./rss-to-emails.component.css']
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

  
  constructor(private feed_service:RssFeedsService) { }

 
  ngOnInit() {
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

  ondelete(name)
  {
this.feed_service.rss_feed_delete(name).subscribe(
  (res:Response)=>
  {
    console.log(res)
  },
  (err:Error)=>{
    console.log(err)
  }
);

  }
 
  onedit()
  {
   this.feed_service.rss_feed_update(this.value_name_new,this.value_name_old,this.value_url_new,this.value_url_old).subscribe
   (
     (res:Response)=>{
       console.log(res)  
     },
     (err:Response)=>{
       console.log(err)
     }
   );

  } 

  oncreate(name,url)
  {
    this.feed_service.rss_feed_create(name,url).subscribe(
      (res:Response)=>
      {
        console.log(res)
      },
      (err:Error)=>{  
        console.log(err)
      }
    );
  }

  
  sendemails(name)
  {
    this.feed_service.rss_feed_reader(name).subscribe(
      (res:Response)=>
      {
        console.log(res)
      },
      (err:Error)=>{
        console.log(err)
      }
    );
    
  }


  onSubmit()
  {
    this.feed_service.rss_feed_create(this.rssform.get('name').value,this.rssform.get('url').value).subscribe
    (
      (res:Response)=>{
        console.log(res)
      },
      (err:Error)=>
      {
        console.log(err)
      }
    );
  }


  setvalue(name,url){
    this.value_name_old=name;
    this.value_url_old=url;
    this.value_name_new=name;
    this.value_url_new=url;
  }



}
