<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException ;
use App\Tenant;
use App\EmailTemplate;
use Illuminate\Support\Facades\Validator;
use Auth;

class EmailTemplateController extends Controller
{
    //


    public function create(Request $request)
    {

        //return response()->json([$request->all()]); 
        $validator = Validator::make($request->all(), 
        [ 
            'name' => 'required|min:3|max:25', 
             'html' => 'required',
            ]);
 
            if ($validator->fails()) 
         { 
            return response()->json([ 
                $validator->errors() ,422   
                
            ]); 
        }

        else{ 

      $template= new EmailTemplate;
      $tenant=Tenant::where([  
         ['name','=',$request->tenant_name], 
         ['user_email','=',Auth::User()->email],  
      ])->first();  
      

      $template->name=$request->name;
      $template->html=$request->html;
      
        
      $template->tenant_id=$tenant->id; 
      $template->save();    
      return response()->json([$template->html]);     
    }
      
}

    public function index($tenant_name)
    { 
        $tenant=Tenant::where([
            ['name','=',$tenant_name], 
            ['user_email','=',Auth::User()->email],  
         ])->first(); 
         
         $templates=EmailTemplate::where('tenant_id','=',$tenant->id)->get();

         return response()->json([ 
             $templates
         ]);   
  
    }

    public function read($name,$tenant_name)
    {
        

              
        $tenant=Tenant::where([
            ['name','=',$tenant_name], 
            ['user_email','=',Auth::User()->email],  
         ])->first(); 
          
        
         $template=EmailTemplate::where([
             ['tenant_id','=',$tenant->id], 
             ['name','=',$name]
             ])->first();

         return response()->json([ 
             $template 
         ]);   
  
    }
    public function update(Request $request)
    {
    
        $validator=Validator::make($request->all(),[
        'name' => 'required|min:3|max:25',
        'html' => 'required',
        'name_old' => 'required',
        ]); 


        if ($validator->fails()) 
        { 
           return response()->json([ 
               $validator->errors() ,422   
               
           ]); 
       }
       else{
        $tenant=Tenant::where([ 
            ['name','=',$request->tenant_name], 
            ['user_email','=',Auth::User()->email],  
         ])->first();   
      
         $email_template=EmailTemplate::where([
           ['tenant_id','=',$tenant->id],   
           ['name','=',$request->name_old],
         ])->first(); 
       
        $email_template->name=$request->name;
        $email_template->html=$request->html;
        $email_template->save();

         }
    }

    public function delete($name,$tenant_name)
    {
        
        $tenant=Tenant::where([  
            ['name','=',$tenant_name], 
            ['user_email','=',Auth::User()->email],  
         ])->first();  
    
         $email_template=EmailTemplate::where([
             ['name','=',$name],
             ['tenant_id','=',$tenant->id], 
         ]);         
      
        $check=$email_template->delete();

        if($check==0)
        {
            return response()->json([false]);   
        }
        else if($check==1)
        {
            return response()->json([true]);   
        }


         

    }




}
