 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInsightsTable extends Migration
{
    /**
     * Run the migrations.  
     *
     * @return void
     */
    public function up()
    {
        Schema::create('insights', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('open_rate');
            $table->bigInteger('img_click');
            $table->unsignedInteger('campaign_id')->nullable();
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->unsignedInteger('rss_feed_id')->nullable();
            $table->foreign('rss_feed_id')->references('id')->on('rss_feeds');
            $table->unsignedInteger('tenant_id'); 
            $table->foreign('tenant_id')->references('id')->on('tenants');
            $table->timestamps();   
        });
    }  
 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('insights');
    }
}
