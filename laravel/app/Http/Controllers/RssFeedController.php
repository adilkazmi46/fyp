<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Feeds;
use View;
use App\Tenant;
use App\Rss_feed;
use Illuminate\Support\Facades\Validator; 
use Auth;
use App\Jobs\SendEmail;
use App\Emails_list; 
use App\Insight;
class RssFeedController extends Controller
{  
    // 
    public function feed_read(Request $request){
        $validator=Validator::make($request->all(),[
            'tenant_name' => 'required',
            'name'        =>  'required|min:3|max:25'

        ]);   

        if($validator->fails())
        {
            return response()->json([
              $validator->errors()
            ],422); 
        }
        else{ 
             
    if(Tenant::where([
                ['name','=',$request->tenant_name],
                ['user_email','=',Auth::User()->email]
            ])->exists()==false)
{
    return response()->json(['Invalid Business'],422);
}    
             
            $tenant=Tenant::where([
                ['name','=',$request->tenant_name],
                ['user_email','=',Auth::User()->email]
            ])->first();
    
            
        $rss=Rss_feed::where([
            ['name','=',$request->name],
            ['tenant_id','=',$tenant->id]
        ])->first();
  
        
        
        $feed = Feeds::make($rss->feed_url,true); // if RSS Feed has invalid mime types, force to read
        $data = array(
          'title'     => $feed->get_title(),
          'permalink' => $feed->get_permalink(), 
          'items'     => $feed->get_items(),
        );
    
              
        //$contents1=file_get_contents($data['permalink']); 
         $html='';
         
        foreach($feed->get_items() as $item)  
        {
            $html=$item->get_permalink();  
            break;
        }
      
 
        $contents1=file_get_contents($html);       
        $contents1.="<img src='http://localhost:8000/api/insights_update_rss/".$tenant->id."/".$rss->id."'  hidden>";
        $emails=Emails_list::select('email')->where('tenant_id', $tenant->id)->pluck('email')->toArray();
         
        dispatch(new SendEmail($emails,$contents1,$rss->name));
    
        return response()->json([ 
            "done" 
        ]); 
 
    }
}
    
    public function rss_create(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'tenant_name' => 'required',
            'feed_url'    =>  'required|url',
            'name'        =>  'required|min:3|max:25'
        ]); 
  
        if($validator->fails())
        {
            return response()->json([
              $validator->errors()    
            ],422); 
        }
        else{
            if(Tenant::where([
                ['name','=',$request->tenant_name],
                ['user_email','=',Auth::User()->email]
            ])->exists()==false)
{
    return response()->json(['Invalid Business'],422);
}    
    

        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first();

        
if(Rss_feed::where([
    ['name','=',$request->name],
    ['tenant_id','=',$tenant->id]
])->exists()==true)
{
return response()->json(['Rss Feed name already exits'],422);
}


if(Rss_feed::where([
    ['feed_url','=',$request->feed_url],
    ['tenant_id','=',$tenant->id]
])->exists()==true)
{
return response()->json(['Rss Feed url already exits'],422);
}   
        $rss_feed=new Rss_feed;
        $rss_feed->tenant_id=$tenant->id;
        $rss_feed->feed_url=$request->feed_url;
        $rss_feed->name=$request->name; 
        $rss_feed->save();

        $insight=new Insight();
        $insight->tenant_id=$tenant->id;
        $insight->rss_feed_id=$rss_feed->id;    
        $insight->open_rate=0;   
        $insight->save();
       
        

        return response()->json([
            true
        ]);
    }

    }
    public function rss_read($tenant_name)
    {
        if(Tenant::where([
            ['name','=',$tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->exists()==false)
{
return response()->json(['Invalid Business'],422);
}    

 
        $tenant=Tenant::where([
            ['name','=',$tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first(); 


        $feed_urls=Rss_feed::where('tenant_id','=',$tenant->id)->get(); 
        return response()->json([
             $feed_urls  
        ]);
            
        
    }


    public function rss_update(Request $request)
    {
        if(Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->exists()==false)
{
return response()->json(['Invalid Business'],422);
}    

        $validator=Validator::make($request->all(),[
            'tenant_name' => 'required',
            'feed_url_old'    =>  'required|url',
            'feed_url_new'    =>  'required|url',
            'name_old'        =>   'required',
            'name_new'        =>    'required|min:3|max:25'

        ]);

        if($validator->fails())
        {
            return response()->json([
              $validator->errors()
            ],422);
        }
        else{
            
            if(Tenant::where([
                ['name','=',$request->tenant_name],
                ['user_email','=',Auth::User()->email]
            ])->exists()==false)
{
    return response()->json(['Invalid Business'],422);
}    
 
        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first(); 

        $rss_feed=Rss_feed::where([
            ['tenant_id','=',$tenant->id],
            ['name','=',$request->name_old],
            ['feed_url','=',$request->feed_url_old]
            
        ])->first();  


       $rss_feed->feed_url=$request->feed_url_new;
       $rss_feed->name=$request->name_new;
       $rss_feed->save();
       return response()->json([
           true
       ]);

    }

    }


    public function rss_delete(Request $request)
    {
       
        if(Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->exists()==false)
{
return response()->json(['Invalid Business'],422);
}    

        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first();

        $rss_feed=Rss_feed::where([
            ['tenant_id','=',$tenant->id],
            ['name','=',$request->name]
        ])->first();

         if(Insight::where([
            ['tenant_id','=',$tenant->id],
            ['rss_feed_id','=',$rss_feed->id]
        ])->exists()==true
)
{        $insight=Insight::where([
            ['tenant_id','=',$tenant->id],
            ['rss_feed_id','=',$rss_feed->id]
        ])->first();

        $insight->delete();
}
        $rss_feed->delete(); 
         
        return response()->json([
          true
        ]); 
    
     
    

    }
}
 