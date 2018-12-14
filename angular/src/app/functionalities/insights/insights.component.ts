import { Component, OnInit } from '@angular/core';
import { InsightsService } from '../../insights.service';
import { Router, ActivatedRoute } from '@angular/router';


 
@Component({ 
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
 data:any;
 data1:any;
 
  constructor(private insights_service:InsightsService,private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit() {
    
    this.insights_service.get_index(localStorage.getItem('tenant_name')).subscribe(

      (res:Response) => 
      { 
          
        this.data=(res[0]);
     console.log(this.data) ;
      },
 
      (err:Error)=>
      { 
        console.log(err); 
      }

  );
  }

oncampaign()
{
  this.router.navigate(['create_campaign'],{
    relativeTo:this.route.parent
  });
}
}