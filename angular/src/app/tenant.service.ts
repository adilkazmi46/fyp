import { Injectable } from '@angular/core';
import { Tenant } from './tenant';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
 
  tenants:Tenant;
 
  constructor(private http:HttpClient,private router:Router) { }


  create_tenant(tenant:Tenant)
  {
    return this.http.post('http://localhost:8000/api/tenant_create',tenant).
    subscribe(
      (res:Response)=> 
      {
          this.set_tenant(res);
          this.router.navigate([localStorage.getItem('email'),localStorage.getItem('tenant_name')]);

      },
      (err:Error) => console.log(err),   

    );
  }

  get_tenant_dashboard(tenant:Tenant)
  {
    return this.http.post('http://localhost:8000/api/tenant_read',tenant).
    subscribe(
      (res:Response)=>
      {
        this.set_tenant(res);
        this.router.navigate([localStorage.getItem('email'),localStorage.getItem('tenant_name')]);
      }, 
      (err:Error)=>console.log(err) 
    );

  } 

    update_tenant(new_name)
    {
      var tenant:Tenant;
      tenant=new_name;
      return this.http.put('http://localhost:8000/api/tenant_update/'+localStorage.getItem('old_name'),tenant).
      subscribe(
        (res:Response)=>
        { 
          console.log(new_name) 
          localStorage.setItem('tenant_name',new_name);  
          this.router.navigate([localStorage.getItem('email')]);
           
        },
        (err:Error)=>console.log(err)
      ); 
   
    }
    delete_tenant(tenant_name)   
    {
      return this.http.delete('http://localhost:8000/api/tenant_delete/'+tenant_name). 
      subscribe(   
        (res:Response)=> 
        { 
          this.router.navigate([localStorage.getItem('email')]);  
          console.log(res); 
        }
      );
       
    
    } 
  

    tenant_index() 
    {
      return this.http.get('http://localhost:8000/api/tenant_index');
    }

 
    logout_tenant() 
    {
      localStorage.removeItem('tenant_name');  
      console.log(localStorage.getItem('tenant_name'))
      this.router.navigate([localStorage.getItem('email')]); 
    } 
  
   set_tenant(name)
   {
     localStorage.setItem('tenant_name',name); 

   }

   get_tenants(res)
   {
   this.tenants=res; 
   }
  tenant_get(){
    console.log(this.tenants) 
    return this.tenants;
  }

  isAuthenticated()
  {
    console.log(localStorage.getItem('tenant_name'))
    if(localStorage.getItem('tenant_name')==null||localStorage.getItem('tenant_name')==''){
      return false; 
    }
    else{
      return true;
    }
  }
   
    

}
 