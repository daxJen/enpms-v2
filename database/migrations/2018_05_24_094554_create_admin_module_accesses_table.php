<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminModuleAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_module_accesses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code')->length(5);
            $table->string('title');
            $table->string('category');
            $table->string('user_category');
            $table->string('user_id');
            $table->integer('access')->length(1)->default(0);
            $table->integer('create_user')->default(0);
            $table->integer('update_user')->default(0);
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
        Schema::dropIfExists('admin_module_accesses');
    }
}
