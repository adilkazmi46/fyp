<?php

namespace App\Http\Controllers; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;
use Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Socialite;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
 
 
    public function authenticate(Request $request)
    {

        $validator = Validator::make($request->all(), 
        [ 
            'email' => 'required|email|email', 
             
            'password' => 'required|min:6|max:25',  
  
            ]);

            if ($validator->fails()) 
         { 
            return response()->json([ 
                $validator->errors() ,422 
                
            ]);
        }
 
    else{

        $credentials =$request->only('email','password');



        try{
        	$token = JWTAuth::attempt($credentials);
            $user = Auth::User();

            if(!$token){

                return response()->json(['error'=>'invalid_credentials'],401);
                
        	}  

 
        }
        catch(JWTException $e)
        {
        	return response()->json(['error'=>'somthing_went_wrong'],500);
        } 
      
   
        return response()->json([$token]);   

    } 
}
 


    public function index()
    {  
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) 
    { 
        //
        $validator = Validator::make($request->all(), 
        [ 
            'email' => 'required|unique:users,email|email',   
            'name' => 'required|min:3|max:25',
            'password' => 'required|min:6|max:25|confirmed',  
  
            ]);

        if ($validator->fails()) 
         { 
            return response()->json([ 
                $validator->errors() ,422
                
            ]);
        }
        else{ 
      $email =$request->email;
      $name= $request->name;
      $password=bcrypt($request->password);

      
      try{

        $user =User::create([

            'name'=>$name, 
            'email'=>$email, 
            'password'=> $password,
            ]);    
      
        $token =JWTAuth::fromUser($user);
       
        if(!$token){
            return response()->json(['error'=>'invalid_credentials'],401);
        }

       
       }catch(JWTException $e)      
        { 
        	return response()->json(['error'=>'somthing_went_wrong'],500);
        
 
       }
    
        $token =JWTAuth::fromUser($user);
    
        return response()->json([$token]);
 
    } 

 

    }


    public function getemail()
    {
        $user = Auth::User(); 
        return response()->json([$user->email]);
    }


    public function social_auth(Request $request)
    {
        return Socialite::driver ( $request->service )->stateless()->redirect ();
    }
 

    public function social_callback($service) { 
        $user = Socialite::with ( $service )->user ();
        return view ( 'home' )->withDetails ( $user )->withService ( $service );  }

    /**  
     * Display the specified resource.
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }



}
