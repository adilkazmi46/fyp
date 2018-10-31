import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from './image';
import { Tenant } from './tenant';
import { text } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
headers:Headers;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }  
 
  get_images()
  {
    return this.http.get('http://localhost:8000/api/image_index/'+localStorage.getItem('tenant_name'));
  }   
    
  get_image(name)
  { 
    return this.http.get('http://localhost:8000/api/image_display/'+localStorage.getItem('tenant_name')+'/'+name);
  }

  upload_image(img:Image,file:File)
  {  
  
  let fd=new FormData();
  fd.append('name',img.name);
  fd.append('tenant_name',img.tenant_name);
  fd.append('image_file',file,img.name);    
  

    return this.http.post('http://localhost:8000/api/image_upload',fd). 
    subscribe( 
      (res:Response) =>    
       {    
         this.router.navigate(['image_gallery'],{
        relativeTo: this.route.parent
      });
        console.log(res)         
      },         
      (err:Error)=>
      {
        console.log("err"+err.message)
      }
    );  
  }
  delete_image(name)
  {
    return this.http.delete('http://localhost:8000/api/image_delete/'+localStorage.getItem('tenant_name')+'/'+name);
  }
    

    


}
