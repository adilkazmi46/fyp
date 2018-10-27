<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Mail;
use App\Emails_list;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| 
*/
Route::post('user_authenticate','UserController@authenticate'); 
Route::post('user_registration',['uses'=>'UserController@register']);
Route::get('insights_update/{tenant_id}/{campaign_id}',['uses'=>'InsightController@update']);
Route::post('social_auth', 'UserController@social_auth' );
Route::get('callback/{service}', 'UserController@social_callback' );
 
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

Route::post('get_insights',['uses' => 'InsightController@index']);
Route::post('get_insight',['uses' => 'InsightController@get_insight']);
   

Route::post('create_campaign',['uses'=>'CampaignController@create']);
Route::post('campaign_index',['uses'=>'CampaignController@index']);
Route::get('image_index/{tenant_name}',['uses' => 'ImageController@image_index']); 
Route::post('image_upload',['uses' => 'ImageController@upload']);
Route::delete('image_delete',['uses' => 'ImageController@delete_image']);
Route::get('image_display/{tenant_name}/{name}',['uses' => 'ImageController@display_image']); 
} );   
