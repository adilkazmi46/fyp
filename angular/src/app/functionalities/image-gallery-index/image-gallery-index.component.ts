import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../images.service';
import { Image } from '../../image';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

 
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({
  selector: 'app-image-gallery-index',
  templateUrl: './image-gallery-index.component.html',
  styleUrls: ['./image-gallery-index.component.css']
})
export class ImageGalleryIndexComponent implements OnInit {
  constructor(private image_service:ImagesService,private router:Router,private route:ActivatedRoute) { }
  imageToShow: any;
  image_url:any=null;
  image:Image;
  image_form:FormGroup;    
  selectedFile:any;
  image_name_value='';
   image_name:FormControl;
   image_file:FormControl;
   delete_image_name:string='';
   delete_status:boolean=false;
   loading:boolean=false; 
   data:any; 
  ngOnInit() {

    
    this.getData();
    this.image_form= new FormGroup({

      'image_name' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),

      'image_file' : new FormControl(null,[Validators.required])
  
    });
  }

  matcher = new MyErrorStateMatcher();  
 
onDelete_modal(name)
{
  this.delete_image_name=name;
   
}

onDelete()
{
  this.delete_status=true;
  if(this.delete_status)
  {
  this.image_service.delete_image(this.delete_image_name).subscribe(
    (res:Response)=>{
     
      console.log(res)
    },(err:Error)=>{ 
      console.log(err)
    }
  );     
  }
  this.getData();
  console.log(this.delete_image_name)
}
onCencel()
{
  this.delete_status=false;
  this.delete_image_name='';
}
onFileSelected(event)
{ 

  console.log(event.target.files[0]);
  this.selectedFile=<File>event.target.files[0];  
   
  
}

getData()
{
  this.image_service.get_images().
    subscribe(
      (res:Response)=> 
      {   
      this.data=Object.entries(res[0]);

      console.log(this.data)
      },  
      (err:Error)=>{
       console.log(err);      
      }
    );

     
}


onupload()
{
  this.router.navigate(['image_upload'],{
    relativeTo:this.route.parent
  });
}
}
 