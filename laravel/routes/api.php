<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Mail;
use App\Emails_list;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------- -----------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| 
*/
Route::post('user_authenticate','UserController@authenticate'); 
Route::post('user_registration',['uses'=>'UserController@register']);

Route::get('insights_update_campaign/{tenant_id}/{campaign_id}',['uses'=>'InsightController@update_campaign']);
Route::get('insights_update_campaign_image/{tenant_id}/{campaign_name}',['uses'=>'InsightController@update_campaign_image']);
Route::get('insights_update_rss/{tenant_id}/{rss_id}',['uses'=>'InsightController@update_rss']);
Route::post('auth_social','UserController@socail_auth_CreateUser_or_login'); 
Route::middleware(['laravel.jwt'])->group(function () {   

Route::get('get_email',['uses' => 'UserController@getemail']);
Route::post('tenant_create',['uses' => 'TenantController@create']);     
Route::post('tenant_read',['uses' => 'TenantController@read']);  
Route::put('tenant_update/{old_name}',['uses' => 'TenantController@update']);   
Route::delete('tenant_delete/{name}',['uses' => 'TenantController@delete']);
Route::get('tenant_index',['uses' => 'TenantController@index']);
   
Route::post('save_contacts',['uses' => 'EmailsListController@read_csv']); 
Route::post('send_emails',['uses' => 'EmailsListController@send_emails']); 
 
Route::post('create_ckeditor_content',['uses' => 'EmailTemplateController@create']);

Route::get('read_ckeditor_content/{name}/{tenant_name}',['uses' => 'EmailTemplateController@read']);
Route::post('update_ckeditor_content',['uses' => 'EmailTemplateController@update']);
Route::delete('delete_ckeditor_content/{name}/{tenant_name}',['uses' => 'EmailTemplateController@delete']);   
Route::get('index_ckeditor/{tenant_name}',['uses' => 'EmailTemplateController@index']);
Route::post('get_insights',['uses' => 'InsightController@index_campaign']);
Route::post('get_insights_rss',['uses' => 'InsightController@index_rss']);

 
Route::post('rss_feed_reader',['uses'=> 'RssFeedController@feed_read']); 
Route::post('rss_feed_create',['uses'=> 'RssFeedController@rss_create']);
Route::get('rss_feed_read/{tenant_name}',['uses'=> 'RssFeedController@rss_read']); 
Route::post('rss_feed_update',['uses'=> 'RssFeedController@rss_update']);
Route::delete('rss_feed_delete/{tenant_name}/{name}',['uses'=> 'RssFeedController@rss_delete']);
  
Route::post('create_campaign',['uses'=>'CampaignController@create']);
Route::post('campaign_index',['uses'=>'CampaignController@index']);
Route::get('image_index/{tenant_name}',['uses' => 'ImageController@image_index']); 
Route::post('image_upload',['uses' => 'ImageController@upload']);
Route::delete('image_delete/{tenant_name}/{name}',['uses' => 'ImageController@delete_image']);
Route::get('image_display/{tenant_name}/{name}',['uses' => 'ImageController@display_image']); 

} );        
 