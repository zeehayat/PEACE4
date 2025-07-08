<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Step 1: Drop any existing foreign key constraints on the old table
        // This is crucial to avoid "Duplicate foreign key constraint name" errors
        // when the new table is created with similar constraints.
        // This block needs to be executed *before* renaming the table.
        if (Schema::hasTable('project_physical_progress')) {
            Schema::table('project_physical_progress', function (Blueprint $table) {
                // Check for and drop foreign keys related to projectable_id if they exist.
                // This part is tricky for polymorphic relations as there's no direct FK.
                // If you had explicit FKs, you'd drop them here by name.
                // Example: $table->dropForeign('some_explicit_fk_name');

                // For generic cases, try to drop by column name, Laravel might infer the FK name.
                // This might throw an error if no FK exists on `projectable_id`, so wrap in try-catch.
                try {
                    // This assumes a foreign key named 'project_physical_progress_projectable_id_foreign'
                    // or similar, which Laravel automatically generates.
                    $table->dropForeign(['projectable_id']);
                } catch (\Exception $e) {
                    // If the foreign key doesn't exist, this will catch the error.
                    // Log the error or ignore it if it's expected.
                }
            });
        }


        // Step 2: Ensure the temporary table doesn't exist from a previous failed migration.
        // Drop it if it does, to prevent rename conflicts.
        if (Schema::hasTable('project_physical_progress_old')) {
            Schema::drop('project_physical_progress_old');
        }

        // Step 3: Rename the existing 'project_physical_progress' table to a temporary name.
        // This preserves your old data. Only perform if the original table exists.
        if (Schema::hasTable('project_physical_progress')) {
            Schema::rename('project_physical_progress', 'project_physical_progress_old');
        }


        // Step 4: Create the new 'project_physical_progress' table with the normalized structure
        Schema::create('project_physical_progress', function (Blueprint $table) {
            $table->id(); // Primary key for each progress entry

            // Polymorphic relationship fields
            $table->unsignedBigInteger('projectable_id');
            $table->string('projectable_type');

            // New fields based on your Excel sheet's normalized structure
            $table->integer('progress_percentage'); // e.g., 25, 50, 75, 100
            $table->date('progress_date')->nullable(); // Date when this percentage was achieved
            $table->string('remarks')->nullable(); // Remarks specific to this progress update

            // Changed project_type to an enum
            $table->enum('project_type', ['Irrigation', 'MHP']); // e.g., 'Irrigation', 'MHP'
            $table->string('reference_code')->nullable(); // CBO reference code

            $table->timestamps(); // created_at and updated_at

            // Add indexes for better performance on polymorphic queries
            $table->index(['projectable_id', 'projectable_type']);

            // Add a unique constraint to ensure only one entry for a specific percentage
            // for a given project.
            $table->unique(['projectable_id', 'projectable_type', 'progress_percentage'], 'project_progress_unique');
        });

        // Step 5: (Optional) Migrate data from 'project_physical_progress_old' to the new table.
        // IMPORTANT: The old table structure (milestone_percent, component) does not directly
        // map to the new date-specific percentage fields (date_of_25% physical_progress, etc.),
        // nor does it contain 'project_type' or 'reference_code'.
        // Therefore, a direct automated data migration from the old table to the new one
        // based on your new Excel sheet's implied structure is not feasible without
        // specific mapping logic from you.
        //
        // If you need to migrate existing data from 'project_physical_progress_old',
        // you will need to manually write the logic here to transform it, or
        // import the data from your Excel sheet into this new table structure.
        //
        // For example, if you wanted to migrate the old 'milestone_percent' and 'remarks'
        // into the new structure, you would need to define how they map to the
        // fixed 25%, 50%, etc. percentages, and how to derive project_type/reference_code.
        //
        // Example (conceptual, requires your specific mapping logic):
        /*
        $oldProgressRecords = DB::table('project_physical_progress_old')->get();
        foreach ($oldProgressRecords as $oldRecord) {
            // This is a placeholder. You would need to define how to map
            // old 'milestone_percent' and 'component' to the new fixed percentages,
            // and how to get 'progress_date', 'project_type', and 'reference_code'.

            // Example for 25% (if you can derive it from old data)
            // DB::table('project_physical_progress')->insert([
            //     'projectable_id' => $oldRecord->projectable_id,
            //     'projectable_type' => $oldRecord->projectable_type,
            //     'progress_percentage' => 25,
            //     'progress_date' => $oldRecord->date_of_25_percent_physical_progress_from_excel_or_derived,
            //     'remarks' => $oldRecord->remarks_for_25_percent_from_excel_or_derived,
            //     'project_type' => 'DerivedProjectType',
            //     'reference_code' => 'DerivedReferenceCode',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ]);
        }
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Step 1: Drop the new 'project_physical_progress' table
        Schema::dropIfExists('project_physical_progress');

        // Step 2: Rename 'project_physical_progress_old' back to 'project_physical_progress'
        // This restores your original table structure and data.
        // Only rename if the old table exists.
        if (Schema::hasTable('project_physical_progress_old')) {
            Schema::rename('project_physical_progress_old', 'project_physical_progress');
        }


        // Step 3: Re-add any foreign key constraints that were dropped in the 'up' method
        // This is crucial if your original table had explicit foreign keys.
        // Example:
        /*
        Schema::table('project_physical_progress', function (Blueprint $table) {
            // If you dropped a foreign key on projectable_id in 'up', re-add it here.
            // $table->foreign('projectable_id')->references('id')->on('your_related_table')->onDelete('cascade');
        });
        */
    }
};
