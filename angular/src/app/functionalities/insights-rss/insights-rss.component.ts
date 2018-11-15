import { Component, OnInit } from '@angular/core';
import { InsightsService } from '../../insights.service';
@Component({
  selector: 'app-insights-rss',
  templateUrl: './insights-rss.component.html',
  styleUrls: ['./insights-rss.component.css']
})
export class InsightsRssComponent implements OnInit {

  data:any;
  data1:any;
  constructor(private insights_service:InsightsService) { }
  
  ngOnInit() {
    
    this.insights_service.get_index_rss(localStorage.getItem('tenant_name')).subscribe(

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

}
