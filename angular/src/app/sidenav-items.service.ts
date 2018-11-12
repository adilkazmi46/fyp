import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class SidenavItemsService {
  
  data = new Array();
  constructor() { }

 
  setData(items) {
    this.data=[]; 
    console.log(this.data)
    var i;
    for (i = 0; i < items.length; i++) {
      this.data.push(items[i]);
    }
     console.log(this.data);
  }

  getdata()
  {
    console.log(this.data);
    return this.data;
  }


}
