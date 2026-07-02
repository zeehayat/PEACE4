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
        Schema::create('project_visits', function (Blueprint $table) {
            $table->id();
            $table->morphs('visitable'); // Creates visitable_id and visitable_type
            $table->date('visit_date');
            $table->string('visitor_role'); // e.g. District Engineer, Senior Engineer
            $table->string('visit_type');   // e.g. Validation, Monitoring
            $table->string('visitor_name')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->index(['visitable_type', 'visitable_id', 'visit_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_visits');
    }
};
