<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tenant;
use App\Campaign;
use App\Insight;    
use App\Rss_feed;
use Auth;
class InsightController extends Controller
{
    //
    public function update_campaign($tenant_id,$campaign_id)
    {            
        $tenant=Tenant::where('id','=',$tenant_id)->first();
        $campaign=Campaign::where('id','=',$campaign_id)->first();
        $insight=Insight::where([
            ['tenant_id','=',$tenant->id],
            ['campaign_id','=',$campaign->id]
        ])->first();
        $count=$insight->open_rate; 
        $count=$count+1; 
        $insight->open_rate=$count; 
        $insight->save();
   
    }


    public function update_campaign_image($tenant_id,$campaign_name)
    {            
        $tenant=Tenant::where('id','=',$tenant_id)->first();
        $campaign=Campaign::where([
            ['tenant_id','=',$tenant->id],
            ['name','=',$campaign_name]
            ])->first();
        $insight=Insight::where([
            ['tenant_id','=',$tenant->id],
            ['campaign_id','=',$campaign->id]
        ])->first();
        $count=$insight->img_click; 
        $count=$count+1;   
        $insight->img_click=$count; 
        $insight->save(); 
   
    }

 
    public function update_rss($tenant_id,$rss_id)
    {            
        $tenant=Tenant::where('id','=',$tenant_id)->first();
        $rss=Rss_feed::where('id','=',$rss_id)->first();
        $insight=Insight::where([
            ['tenant_id','=',$tenant->id],
            ['rss_feed_id','=',$rss->id]
        ])->first();
        $count=$insight->open_rate;  
        $count=$count+1; 
        $insight->open_rate=$count; 
        $insight->save();  
   
    }
    
    public function index_campaign(Request $request) 
    { 
        //return response()->json([$request->tenant_name]);
        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
            ])->first(); 
  
    

        $insights=Insight::where([
            ['tenant_id','=',$tenant->id ],
            ['rss_feed_id','=',null]]  
        )->get(); 
         
        $campaign_names=array();
        foreach($insights as $value){
         $value->campaign_id=Campaign::select('name')->where('id','=',$value->campaign_id)->first();
        }    
       // $campaign=Campaign::where('id','=',$insights->campaign_id)->first();   
        //return $insights;
        
        return response()->json([$insights]); 
         
    }

    public function index_rss(Request $request) 
    { 
        //return response()->json([$request->tenant_name]);
        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
            ])->first(); 
  
    

        $insights=Insight::where([  
            ['tenant_id','=',$tenant->id ],
            ['campaign_id','=',null]]  
        )->get();   
         
        $rss_names=array();
        foreach($insights as $value){ 
         $value->rss_feed_id=Rss_feed::select('name')->where('id','=',$value->rss_feed_id)->first();
        }    
       // $campaign=Campaign::where('id','=',$insights->campaign_id)->first();   
        //return $insights;
        
        return response()->json([$insights]); 
         
    } 

    public function get_insight(Request $request)
    {
    
    $tenant=Tenant::where([  
            ['name','=',$request->tenant_name], 
            ['user_email','=',Auth::User()->email]
            ])->first();

            
    $campaign=Campaign::where([
        ['name','=',$request->campaign_name],
        ['tenant_id','=',$tenant->id],
        ])->first();
        

        $insight=Insight::where( 
            [
            ['tenant_id','=',$tenant->id],
            ['campaign_id','=',$campaign->id],
            ] 
        )->first(); 
       
        
        return response()->json([
            $insight  
        ]);
        
    }    

}
