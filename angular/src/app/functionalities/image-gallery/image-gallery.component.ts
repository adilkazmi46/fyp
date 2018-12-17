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
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html', 
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit { 

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
   error_message:any;
  ngOnInit() {

    
    
    this.image_form= new FormGroup({

      'image_name' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),

      'image_file' : new FormControl(null,[Validators.required])
  
    });
  }

  matcher = new MyErrorStateMatcher();  
  
  onupload()
{
  this.loading=true;
  console.log("sdkjskdj");
  console.log(this.image_form.get('image_name').value)
  this.image={ name:this.image_form.get('image_name').value,
   tenant_name:localStorage.getItem('tenant_name')};
 console.log(this.selectedFile);
  this.image_service.upload_image(this.image,this.selectedFile).subscribe( 
      (res:Response) => {    
         this.loading=false;
         this.image_form.reset();
        console.log(res)         
      },          
      (err)=>
      {
        this.loading=false;
        this.error_message=err.error;
        console.log(err.error) ;
        document.getElementById("modal_toggle_err").click();     
        
      }  
    );
   
}   



onDelete_modal(name)
{
  this.delete_image_name=name;
   
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


}

 
