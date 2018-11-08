import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../../campaign.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.css']
})
export class CampaignIndexComponent implements OnInit {

  data:any; 
  constructor(private campaign_service:CampaignService,private route:ActivatedRoute,private router:Router) {

   }

  ngOnInit() {
    this.getData();
    
  }

  oncreate()
  {
this.router.navigate(['create_campaign'],{
  relativeTo:this.route.parent  
});
  }

  getData()
  {
    this.campaign_service.campaign_index(localStorage.getItem('tenant_name')).subscribe(  

      (res:Response) =>  
      {  
        
        this.data=(res[0]);  
        

        
      console.log(this.data)               
      }  ,
 
      (err:Error)=>
      { 
        console.log(err); 
      }

  );
  }
}
