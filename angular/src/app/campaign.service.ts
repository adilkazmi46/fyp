import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http:HttpClient) { }

  start_campaign(campaign_name,templatename)
  {
    var campaign={
     name:campaign_name,
     template_name:templatename,
     tenant_name:localStorage.getItem('tenant_name')
    };
return this.http.post('http://localhost:8000/api/create_campaign',campaign).subscribe(
  (res:Response)=>{
    console.log(res)
  },
  (err:Error)=>{
    console.log(err)
  }
);
  }

  campaign_index(name)
  { 
    let campaign={
      tenant_name:name
    }; 
    return this.http.post('http://localhost:8000/api/campaign_index',campaign);
  }
}
