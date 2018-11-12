import { Component, OnInit } from '@angular/core';
import { SidenavItemsService } from '../sidenav-items.service';

@Component({
  selector: 'app-sidenav-items',
  templateUrl: './sidenav-items.component.html',
  styleUrls: ['./sidenav-items.component.css'],
  providers:[SidenavItemsComponent] 
})
export class SidenavItemsComponent implements OnInit {

  data:string[];
  constructor(private items:SidenavItemsService) {
    this.data=this.items.data;
   }
 
  ngOnInit() {  
         
     
  }

}
