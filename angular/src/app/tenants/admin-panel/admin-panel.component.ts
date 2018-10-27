import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { TenantService } from '../../tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private user_service:UserService,private tenant_service:TenantService,private router:Router) { }

  ngOnInit() {
  }


  onLogout()
  {
    this.user_service.logout();
  }

  onAdd_Business(){ 
    console.log(localStorage.getItem('email'));
   this.router.navigate([localStorage.getItem('email'),'AddBusiness']);
  }  
}
   