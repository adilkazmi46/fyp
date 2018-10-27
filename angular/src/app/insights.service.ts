import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor(private http:HttpClient) { }

   get_index(name)
  {
    let data={
      tenant_name:name
    };
  return this.http.post("http://localhost:8000/api/get_insights",data);

  }

    
}
