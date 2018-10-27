import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ImportContactsService {

  
  constructor(private http:HttpClient,private router:Router) { }

  import_contacts(file_temp)
  {
  
    var fd=new FormData();
    fd.append('file',file_temp,file_temp.name);  
    fd.append('tenant_name',localStorage.getItem('tenant_name'));
    return this.http.post('http://localhost:8000/api/save_contacts',fd);
  }


}
