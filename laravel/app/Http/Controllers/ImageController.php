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

        $path = ''.'/images/'.Auth::User()->email.'/'.$request->tenant_name ;
        
        if(is_dir(''.'/images/'.Auth::User()->email.'/'.$request->tenant_name)==false)
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

    

       return  response()->file(storage_path('app'.$image->src));    
               
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

        $path = ''.'/images/'.Auth::User()->email.'/'.$tenant->name ;
 
        $files = Storage::files($path);
        return $files;
        foreach($files as $file)
        {  
            return response()->file(storage_path('app/'.$file));
        } 

        return response()->json([$files]);  

     

     $images=DB::table('images')->where('tenant_id','=',$tenant->id)->get();
     $count=DB::table('images')->where('tenant_id','=',$tenant->id)->count();
  
     $imgs;
     foreach($images as $image)  
     {
          $imgs[$image->name]= $image->src;  
         
            
     } 

     return response()->json([$imgs]);    
      
    }   

    public function display_image($tenant_name,$name)    
    {   
        $path = ''.'/images/'.Auth::User()->email.'/'.$tenant_name ;
        $path=$path.'/'.$name;   
         
        return response()->file(storage_path('app'.$path));     
    }   

    public function delete_image(Request $request)
    {
        $path = ''.'/images/'.Auth::User()->email.'/'.$request->tenant_name ;
        $path=$path.'/'.$request->name;        
        Storage::delete($path);
    }  
}
    

