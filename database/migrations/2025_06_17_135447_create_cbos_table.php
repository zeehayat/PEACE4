<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cbos', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code')->unique();
            $table->string('district');
            $table->string('tehsil');
            $table->string('vc_nc');
            $table->string('village');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('cbos');
    }
};
