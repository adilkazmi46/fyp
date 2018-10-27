<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mail;
class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emails,$template,$campaign_name;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($emails,$template,$campaign_name)  
    {
        //
        
        $this->emails=$emails;
        $this->template=$template;
        $this->campaign_name=$campaign_name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $html=$this->template;  
        Mail::send(array(), array(), function ($message) use ($html) {
            $message->to($this->emails)
              ->subject($this->campaign_name)
              
              ->setBody($html, 'text/html');
          });
     
        /*$data = array(["ashaksj","asmkhakmms"]); 
    Mail::raw($this->template,$data, function($message)  
    {
        $message->to($this->emails)->subject($this->campaign_name);
    });
    */ 
   

    }
}
