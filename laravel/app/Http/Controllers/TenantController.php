<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User;
use App\Tenant;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Emails_list;
use App\EmailTemplate;

use App\Insight;
use App\Rss_feed;
use App\Campaign;
use App\Image;

 
class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

 
/*public function __construct() 
    {
        $this->middleware('laravel.jwt');
    }*/
    public function index()
    {
        //
        $user=Auth::User();
        $email=$user->email; 
        
        $tenants = DB::table('tenants')->where('user_email','=',$email)->pluck('name');
         
           if(DB::table('tenants')->get()->where('user_email','=',$email)->count()>0)
           {  
        return response()->json(array( $tenants));  
           }  
           else   
           {    
               return response()->json([
                   "enter the name of your bussiness!"
               ]);
           }  
 
    }

    /** 
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $validator = Validator::make($request->all(), 
        [ 
            'name' => 'required|min:3|max:25', 
  
            ]);

        
            if ($validator->fails()) 
         { 
            return response()->json([ 
                $validator->errors() ,
                
            ],422);
        }
  else{ 
        
        $tenant=new Tenant; 
        $tenant->name=$request->name;
        $tenant->user_email=Auth::User()->email; 
        $tenant->save(); 
        return response()->json([$tenant->name]);
 
    } 

}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function read(Request $request)
    {  
   
        $tenant=Tenant::where([
            ['name','=',$request->name],
            ['user_email','=',Auth::User()->email]
            ])->get();      
        return response()->json([$tenant]);   

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$old_name) 
    { 
        //

           $validator = Validator::make($request->all(), 
           [ 
               'name' => 'required|min:3|max:25', 
     
               ]);

               if ($validator->fails()) 
            { 
               return response()->json([ 
                   $validator->errors()    
                   
               ],422);
           }

           else{  
        $tenant=Tenant::where([
            ['name','=',$old_name],
            ['user_email','=',Auth::User()->email]
        ])->first();
        $tenant->name=$request->name;
        $tenant->save();    
        return response()->json([$tenant->name]);  
               
    } 
  
    }

    /**
     * Remove the specified resource from storage.
     *  
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($name)
    {
        //
  
        $tenant=Tenant::where([
            ['name','=',$name],
            ['user_email','=',Auth::User()->email]
        ])->first();
        
        Insight::where([
            ['tenant_id','=',$tenant->id]
            ])->delete();    
        Campaign::where([
        ['tenant_id','=',$tenant->id],
        ])->delete();
        
        Emails_list::where([
            ['tenant_id','=',$tenant->id]
            ])->delete();
        
        EmailTemplate::where([
                ['tenant_id','=',$tenant->id]
                ])->delete();    
                
        
        Image::where([
                    ['tenant_id','=',$tenant->id]
                    ])->delete();  
         
                        
        
        Rss_feed::where([
                            ['tenant_id','=',$tenant->id]
                            ])->delete();

                            $tenant->delete();
        return response()->json(["deleted successfully"]);
 
    }
}
    