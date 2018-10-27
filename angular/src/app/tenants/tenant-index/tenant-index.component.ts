import { Component, OnInit, OnChanges } from '@angular/core';
import { TenantService } from '../../tenant.service';
import { Tenant } from '../../tenant';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-index',
  templateUrl: './tenant-index.component.html',
  styleUrls: ['./tenant-index.component.css']
})
export class TenantIndexComponent implements OnInit {

  
   tenants_collection:string[];
    show:boolean=true;
  constructor(private tenant_service:TenantService,private router:Router) { }
 

  
  ngOnInit() {
    
    this.tenant_service.tenant_index().subscribe(
      (tenants :Tenant)=>
      {  
        this.tenants_collection=tenants.toString().split(','); 
        console.log(this.tenants_collection[0]); 
        if(this.tenants_collection[0]=="enter the name of your bussiness!")
        {  
          console.log(this.show);
          this.show=false;  
          console.log(this.show)
        } 
        console.log(this.tenants_collection); 
      }, 
    )  
  }
  
  onOpen(tenant)
  {   
  localStorage.setItem('tenant_name',tenant);
  this.router.navigate([localStorage.getItem('email'),localStorage.getItem('tenant_name')])
  }
   
  onDelete(tenant)
  {  
    console.log(tenant);
    this.tenant_service.delete_tenant(tenant);
     this.ngOnInit();

  }

  onEdit(tenant)
  {
    localStorage.setItem('old_name',tenant); 
   this.router.navigate([localStorage.getItem('email'),'EditBusiness']);
  }

}
   