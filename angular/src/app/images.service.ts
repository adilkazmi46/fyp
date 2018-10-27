import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from './image';
import { Tenant } from './tenant';
import { text } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }  

  get_images(tenant_name)
  {
    return this.http.get('http://localhost:8000/api/image_display/hjkjl/kazmi.png');
  }   

  get_image(path)
  { 
    return this.http.post('http://localhost:8000/api/image_display',path);
  }

  upload_image(img:Image,file:File)
  {  
  
  let fd=new FormData();
  fd.append('name',img.name);
  fd.append('tenant_name',img.tenant_name);
  fd.append('image_file',file,img.image_file.name);   
  

    return this.http.post('http://localhost:8000/api/image_upload',fd,{responseType: 'text'
  }). 
    subscribe( 
      (res) =>    
       {    
         document.getElementById('output').setAttribute('src',res);
        console.log(res)         
      },   
      (err:Error)=>
      {
        console.log("err"+err.message)
      }
    );  
  }
  delete_image(img:Image)
  {
    return this.http.post('http://localhost:8000/api/image_delete',img)
  }

  


}
