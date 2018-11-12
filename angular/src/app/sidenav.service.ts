import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})  
export class SidenavService {

  constructor() { }

  import_url()
  {
    return '/'+localStorage.getItem('email')+'/'+localStorage.getItem('tenant_name')+'/import_contacts';
  }
}
