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
  loader:boolean=false;
  error_message:any;
  constructor(private campaign_service:CampaignService,private route:ActivatedRoute,private router:Router) {

   }

  ngOnInit() {
    this.loader=true;
    this.getData();
    this.loader=false;
  }

  oncreate()
  {
    this.loader=true; 
this.router.navigate(['create_campaign'],{
  relativeTo:this.route.parent  
}); 
  }

  getData()
  {
    this.loader=true;
    this.campaign_service.campaign_index(localStorage.getItem('tenant_name')).subscribe(  

      (res:Response) =>  
      {  
        this.data=(res[0]); 
        this.loader=false;            
      }  ,
 
      (err)=>
      { 
        this.error_message=err.error;
        document.getElementById("modal_toggle").click();      
        this.loader=false;

      }

  );
  }
}
