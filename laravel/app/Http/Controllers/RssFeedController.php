<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Feeds;
use View;
use Illuminate\Validation\Validator;
use App\Tenant;
use App\Rss_feed;
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
            ]);
        }
        else{
            
    $tenant=Tenant::where([
                ['tenant_name','=',$request->tenant_name],
                ['user_email','=',Auth::User()->email]
            ])->first();
    
        
        $rss=RssFeed::where([
            ['name','=',$request->name],
            ['tenant_id','=',$tenant->id]
        ])->first();
  
        $feed = Feeds::make($rss->feed_url,0,true); // if RSS Feed has invalid mime types, force to read
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
        return response(
            $contents1
         ); 
 
    }
}
    
    public function create(Request $request)
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
            ]);
        }
        else{
        $tenant=Tenant::where([
            ['tenant_name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first();

        $rss_feed=new RssFeed;
        $rss_feed->tenant_id=$tenant->id;
        $rss_feed->feed_url=$request->feed_url;
        $rss_feed->name=$request->name;
        $rss_feed->save();

        return response(true);
    }

    }
    public function read(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'tenant_name' => 'required',
            

        ]);
 
        if($validator->fails())
        {
            return response()->json([
              $validator->errors()
            ]);
        }
        else{
        $tenant=Tenant::where([
            ['tenant_name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first(); 


        $feed_urls=RssFeed::where('tenant_id','=',$tenant->id)->get();
        
        return response()->json([
            $feed_urls 
        ]);
          
        }
    }


    public function update(Request $request)
    {
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
            ]);
        }
        else{
        $tenant=Tenant::where([
            ['tenant_name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first(); 

        $rss_feed=RssFeed::where([
            ['tenant_id','=',$tenant->id],
            ['user_email','=',Auth::User()->email]
        ])->first();  


       $rss_feed->feed_url=$request->feed_url_new;
       $rss_feed->name=$request->name_new;
       $rss_feed->save();
       return response(true);  

    }

    }


    public function delete($tenant_name,$feed_name)
    {
        $validator=Validator::make($request->all(),[
            'tenant_name' => 'required',
            'name'        =>  'required|min:3|max:25'

        ]);   

        if($validator->fails())
        {
            return response()->json([
              $validator->errors()
            ]);
        }
        else{
        $tenant=Tenant::where([
            ['tenant_name','=',$request->query('tenant_name')],
            ['user_email','=',Auth::User()->email]
        ])->first();

        $rss_feed=RssFeed::where([
            ['tenant_id','=',$tenant->id],
            ['name','=',$request->query('name')]
        ])->first();
        
        $rss_feed->delete(); 
         
        return response()->json([
          true
        ]);
    
    
    }

    }
}
 