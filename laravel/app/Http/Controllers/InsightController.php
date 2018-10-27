<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tenant;
use App\Campaign;
use App\Insight;    
use Auth;
class InsightController extends Controller
{
    //
    public function update($tenant_id,$campaign_id)
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
    
    public function index(Request $request) 
    {
        //return response()->json([$request->tenant_name]);
        $tenant=Tenant::where([
            ['name','=',$request->tenant_name],
            ['user_email','=',Auth::User()->email]
            ])->first();
  
    

        $insights=Insight::where(
            'tenant_id','=',$tenant->id 
        )->get(); 
         
        $campaign_names=array();
        foreach($insights as $value){
         $value->campaign_id=Campaign::select('name')->where('id','=',$value->campaign_id)->first();
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
