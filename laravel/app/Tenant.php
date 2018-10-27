<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    //
    protected $fillable = [ 
        'name' 
    ]; 

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    public function emails_list()
    {
        return $this->hasMany('App\Emails_list');
    }

    public function emailtemplate()
    {
        return $this->hasMany('App\EmailTemplate');
    }

 
    public function scopeBytenant($query,$name)
    {
           
        return $query->where('name', $name);
    }
      
    public function scopeByuser($query,$user_email)
    { 
     return $query->where('user_email', $user_email);
    }
  
}
