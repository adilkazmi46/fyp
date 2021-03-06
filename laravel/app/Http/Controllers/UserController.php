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
              'error'=>  $validator->errors(),
            ],422);
        }
 
    else{

        $credentials =$request->only('email','password');
        try{
        	$token = JWTAuth::attempt($credentials);
            $user = Auth::User();

            if(!$token){

                return response()->json(['Invalid Credentials'],401);
                
        	}  

 
        }
        catch(JWTException $e)
        {
        	return response()->json(['Somthing Went Wrong'],500);
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
            return response()->json([$validator->errors()],401);
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
            return response()->json(['invalid_credentials'],401);
        }
    
        
       }catch(JWTException $e)      
        { 
        	return response()->json(['somthing_went_wrong'],500);
        
 
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

    


    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('facebook')->stateless()->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('facebook')->stateless()->user();

        return  $user->token;
    }

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



    public function socail_auth_CreateUser_or_login(Request $request)
    {  
        //return response()->json([$request->email]); 
        $authUser = User::where('email', $request->email)->first();
        if ($authUser) {  
         $token= JWTAuth::fromUser($authUser);    
            return response()->json([
            $token  
            ]);      
        }   
        else{   
         
        $user= new User;
        $user->name=$request->name;
        $user->email=$request->email;
        $user->save();
        $token= JWTAuth::fromUser($user);
        return response()->json([
        $token
        ]);  
  
       
    }
}


}
