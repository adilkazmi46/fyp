<?php

namespace App\Http\Controllers;
use File;  
use Illuminate\Http\Request;
use App\Image;
use Auth;
use App\User;
use DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use URL;
use Response;
 

class ImageController extends Controller
{
    //
  
    public function upload(Request $request)
    {    
      //return response()->json([$request->all()]);
                
         $validator=Validator::make($request->all(),[
         'tenant_name' => 'required',
         'image_file'  =>  'required|image',
         'name'  =>  'required|min:3|max:25|'
         ]);  
         
         if ($validator->fails()) {
        return response()->json([ 
         $validator->errors()
        ]); 
        }

        else{   

        
        $tenant=DB::table('tenants')->where([['name','=',$request->tenant_name],['user_email','=',Auth::User()->email]])->exists();
        
        if($tenant==true)  
        {
            $tenant_id=DB::table('tenants')->where([['name','=',$request->tenant_name],['user_email','=',Auth::User()->email]])->first();

        $path = ''.'/public/images/'.Auth::User()->email.'/'.$request->tenant_name ;
        
        if(is_dir(''.'/public/images/'.Auth::User()->email.'/'.$request->tenant_name)==false)
        {
            Storage::makeDirectory($path);
        }

      
       
       $image_file=$request->image_file;
       $image_name=$request->name;
          
       $image=new Image;
       $image->name=$request->name.'.'.$request->image_file->extension();  
       $image->src=$path.'/'.$image_name.'.'.$request->image_file->extension();
 
       $image->tenant_id=$tenant_id->id; 
       $image->save(); 
       $request->file('image_file')->storeAs(  
         $path,$image_name.'.'.$request->image_file->extension()  
    );          
 
    

       return  response()->json([
           "done"
       ]);    
               
    }             
    else if($tenant==false){
        return response()->json([
          "tenant not found"
        ]);
    }

}

    }


    public function image_index($tenant_name)
    {
        $tenant=DB::table('tenants')->where([
            ['name','=',$tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first();

        $path =''.'/storage/images/'.Auth::User()->email.'/'.$tenant_name ;      
        $name=Image::select('name')->where('tenant_id','=',$tenant->id)->pluck('name');
        $paths=array();
      
        foreach($name as $value)
        {     
          $path_temp=$path;
          $path_temp.='/'.$value;   
           $paths[$value]=$path_temp;        
          // array_push($paths,($path_temp));          
        }
           

        //return response()->json([$files]);  

     //return $paths;
     return response()->json([
        $paths,
     ]);   
       
    }
    
    

    
    public function image_index_ck($tenant_name)
    {
        $tenant=DB::table('tenants')->where([
            ['name','=',$tenant_name],
            ['user_email','=',Auth::User()->email]
        ])->first();

        $path =''.'/storage/images/'.Auth::User()->email.'/'.$tenant_name ;      
        $name=Image::select('name')->where('tenant_id','=',$tenant->id)->pluck('name');
        $paths=array();
      
        foreach($name as $value)
        {     
          $path_temp=$path;
          $path_temp.='/'.$value;   
           $paths[$value]=$path_temp;        
          // array_push($paths,($path_temp));          
        }        

        //return response()->json([$files]);  

     //return $paths;
     return response()->json([
        $paths,
     ]);   
      
    }

    public function display_image($tenant_name,$name)    
    {   
        $path =''.'/storage/images/'.Auth::User()->email.'/'.$tenant_name ;
        $path=$path.'/'.$name;   
         
        //return response()->json([$path]); 
    //  return response()->file(storage_path('app'.$path));     
      return "<img  src='localhost:8000$path'/>";             
        //return $img;
           
    }   

    public function delete_image($tenant_name,$name)
    {
         $path = ''.'/public/images/'.Auth::User()->email.'/'.$tenant_name.'/'.$name ;
         $image=Image::where('name','=',$name)->first();
         $image->delete();
        Storage::delete($path);    
    }  
}  
    

