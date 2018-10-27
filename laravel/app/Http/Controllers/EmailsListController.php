<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException ;
use App\Tenant;
use Mail;
use App\Emails_list;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;
class EmailsListController extends Controller
{
    //   

    public function read_csv(Request $request)
    {
         
        $validators=Validator::make($request->all(),[
         'file' => 'required|mimes:csv,txt',
         'tenant_name' => 'required'
        ]);

        if($validators->fails())
        {
            return response()->json([  
                $validators->errors()
            ]);
        }
        else{
        $path=$request->file->getRealPath();
        $file = fopen($path,"r");
         fgetcsv($file);
      $data = [];
      while($column = fgetcsv ($file) )
      {
          if($column[0]=="")
          {
              continue;
          }
          array_push($data,$column);
      } 
      $emails = [];
      $temp = [];
      
       foreach($data as $key => $value)
       {        
           $val = implode(",",$value); 

         $templ=explode(",",$val);
         
         foreach($templ as $key => $valx)
         {
             array_push($temp,$valx);
         }          
       }

       foreach($temp as $key => $value )
       {
            
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            array_push($emails,$value);
          }
          else{
              continue; 
          }

        }
       $user = Auth::User()->email;   
    
       $tenant=DB::table('tenants')->where([['name','=',$request->tenant_name],['user_email','=',Auth::User()->email]])->exists();
  

      if($tenant==true)
 
{ 
    
    
    $counter=0;

    
     
    $tenant=DB::table('tenants')->where([['name','=',$request->tenant_name],['user_email','=',Auth::User()->email]])->first();
    
    $counter1=Emails_list::where('tenant_id',$tenant->id)->count(); 

        foreach($emails as $key => $value) 
        {
             try{
DB::insert('insert ignore into emails_lists (email,tenant_id) values ("'.$value.'", "'.$tenant->id.'")');
             }
             catch(Exception $e){ 
               continue;
             }
        }

    $counter=Emails_list::where('tenant_id',$tenant->id)->count();
    return response()->json([$counter-$counter1]);   
    } 

}
    }
}
