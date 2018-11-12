<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Campaign;
use App\Tenant;
use App\EmailTemplate;
use Auth;
use Illuminate\Support\Facades\Validator;  
use App\Jobs\SendEmail;
use DB;
use App\Emails_list; 
use App\Insight; 
use Mail; 
class CampaignController extends Controller
{
    //

    public function create(Request $request)
    {
 
      /*  return response()->json([
            $request->all()
        ]);*/ 
    $validator=Validator::make($request->all(),[
        'name' => 'required|min:3|max:25',
        'tenant_name' => 'required',
        'template_name' => 'required',   
        ]);

        if($validator->fails())
        { 
            return response()->json([$validator->errors()]);
        }
        else{
      $tenant=DB::table('tenants')->where([
         ['name','=',$request->tenant_name],
         ['user_email','=',Auth::User()->email]
      ])->first(); 

             
      //$emails=DB::table('emails_lists')->where('tenant_id','=',$tenant->id)->get(['email']);
     

      $template=EmailTemplate::where([
        ['name','=',$request->template_name],
        ['tenant_id','=',$tenant->id]
     ])->first(); 
 
     $campaign=new Campaign();
     $campaign->name=$request->name;
     $campaign->tenant_id=$tenant->id;  
     $campaign->template_id=$template->id;
     $campaign->save();
  
     $insight=new Insight();
     $insight->tenant_id=$tenant->id;
     $insight->campaign_id=$campaign->id;
     $insight->open_rate=0; 
     $insight->img_click=0; 
     $insight->save();
    
     
     $template->html.="<img src='http://localhost:8000/api/insights_update_campaign/".$tenant->id."/".$campaign->id."'  hidden>";
/*  
      return response()->json([
        $template->html 
          ]);*/
     $template->save();    
 
     $html=$template->html;
     $campaign_name=$campaign->name;
      
     $emails=Emails_list::select('email')->where('tenant_id', $tenant->id)->pluck('email')->toArray();
      


     
     dispatch(new SendEmail($emails,$template->html,$campaign->name));   


    return response()->json([ 
        "done"  
    ]); 
    
    }

}

public function index(Request $request)
{
    $validator=Validator::make($request->all(),[  
        'tenant_name' => 'required',
        ]); 

        if($validator->fails())
        { 
            return response()->json([$validator->errors()]);
        }  
        else{
 
           $tenant=Tenant::where([
               ['name','=',$request->tenant_name],
               ['user_email','=',Auth::User()->email]
           ])->first();
           //return response()->json([$tenant]); 

           $campaign=Campaign::where('tenant_id','=',$tenant->id)->get();
           return response()->json([
            $campaign
           ]);
        }
    
}
    


}
    