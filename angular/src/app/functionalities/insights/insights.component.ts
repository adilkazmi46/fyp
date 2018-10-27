import { Component, OnInit } from '@angular/core';
import { InsightsService } from '../../insights.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Insights } from '../../insights';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
 data:any;
 data1:any;
insights:Insights[];
  constructor(private insights_service:InsightsService) { }

  ngOnInit() {
    
    this.insights_service.get_index(localStorage.getItem('tenant_name')).subscribe(

      (res:Response) => 
      { 
          
        this.data=(res[0]);
     console.log(this.data) 
      },
 
      (err:Error)=>
      { 
        console.log(err); 
      }

  );
  }

}
