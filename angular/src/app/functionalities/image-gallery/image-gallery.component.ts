import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../images.service';
import { Image } from '../../image';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroupDirective, NgForm } from '@angular/forms';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}  

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html', 
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit { 

  constructor(private image_service:ImagesService) { }

  image_url:any=null;
  image:Image;
  image_form:FormGroup;    
  selectedFile:File=null;
  image_name_value='';
   image_name:FormControl;
   image_file:FormControl;
  ngOnInit() {
    this.image_form= new FormGroup({

      'image_name' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),

      'image_file' : new FormControl(null,[Validators.required])

    });
  }

  matcher = new MyErrorStateMatcher();  
 
  onupload()
{
  this.image={ name:this.image_form.get('image_name').value,
   tenant_name:localStorage.getItem('tenant_name')};
 console.log(this.selectedFile);
  this.image_service.upload_image(this.image,this.selectedFile);
}

onFileSelected(event)
{ 
  console.log(event.target.files[0]);
  this.selectedFile=<File>event.target.files[0];  

  var reader = new FileReader();  
  var dataURL=null;
    reader.onload = () => {
      dataURL = reader.result;
     console.log(dataURL);
     this.image_url=dataURL; 
      
    };

    reader.readAsDataURL(this.selectedFile);
  //this.selectedFile=this.image_form.get('image_file').value;
 
}


}
