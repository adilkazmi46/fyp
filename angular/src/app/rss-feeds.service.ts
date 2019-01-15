import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RssFeedsService {

  constructor(private http:HttpClient) { }


  rss_feeds_index()
  {
    return this.http.get('http://localhost:8000/api/rss_feed_read/'+localStorage.getItem('tenant_name'));
  } 

  rss_feed_update(name_n,name_o,feed_url_n,feed_url_o)
  {
    let data={
     name_new:name_n,
     name_old:name_o,
     feed_url_new:feed_url_n,
     feed_url_old:feed_url_o,
     tenant_name:localStorage.getItem('tenant_name')
    };
    return this.http.post('http://localhost:8000/api/rss_feed_update',data);
  }
  
  rss_feed_delete(name)
  {
    console.log('http://localhost:8000/api/rss_feed_delete/'+localStorage.getItem('tenant_name')+'/'+name)
     return this.http.delete('http://localhost:8000/api/rss_feed_delete/'+localStorage.getItem('tenant_name')+'/'+name);
  }

  rss_feed_reader(na){
    let data={
      name:na,
      tenant_name:localStorage.getItem('tenant_name')
    };
    return this.http.post('http://localhost:8000/api/rss_feed_reader',data);
  }

  rss_feed_create(na,url){
    let data={ 
      name:na,
      feed_url:url, 
      tenant_name:localStorage.getItem('tenant_name')
    }; 
    return this.http.post('http://localhost:8000/api/rss_feed_create',data);
  }
  
}
