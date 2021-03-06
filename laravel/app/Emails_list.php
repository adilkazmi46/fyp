<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Emails_list extends Model
{ 
    // 

    
    public function tenant()
    {
        return $this->belongsTo('App\Tenant');
    }


    public function scopeBytenant($query,$name)
    {
        return $query->where('tenant_name',$name);
    }
}
