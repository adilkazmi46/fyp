import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailTemplate } from './email-template';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http:HttpClient) { }  


  save_template(email_template:EmailTemplate)
  {  
 return this.http.post('http://localhost:8000/api/create_ckeditor_content',email_template);
  }

  get_index(tenant_name) 
  {
    return this.http.get('http://localhost:8000/api/index_ckeditor/'+tenant_name);
  }  

  delete_template(name)
  {
    return this.http.delete('http://localhost:8000/api/delete_ckeditor_content/'+name+'/'+localStorage.getItem('tenant_name')); 
  }

  get_template(name)
  { 
    return this.http.get('http://localhost:8000/api/read_ckeditor_content/'+name+'/'+localStorage.getItem('tenant_name'));
  }
}
