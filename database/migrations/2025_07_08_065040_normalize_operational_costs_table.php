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
        // 1. Create the new 'expense_types' table
        // Add a check to ensure the table doesn't already exist to prevent "table already exists" errors
        if (!Schema::hasTable('expense_types')) {
            Schema::create('expense_types', function (Blueprint $table) {
                $table->id();
                $table->string('name')->unique(); // e.g., 'HR Office Expenses', 'Financial Charges'
                $table->timestamps();
            });

            // Populate 'expense_types' with predefined categories only if the table was just created
            $expenseTypes = [
                'HR Office Expenses',
                'Financial Charges',
                'Insurance Charges',
                'Vehicle Operational Cost',
                'Management Cost',
                'O&M Cost',
                'Rehab & Reconstruction Cost', 'Repair Civil Work Cost', 'Repair T&D Cost'
            ];

            foreach ($expenseTypes as $type) {
                DB::table('expense_types')->insert([
                    'name' => $type,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Get the IDs of the expense types (whether newly inserted or already existing)
        $hrOfficeExpensesId = DB::table('expense_types')->where('name', 'HR Office Expenses')->value('id');
        $financialChargesId = DB::table('expense_types')->where('name', 'Financial Charges')->value('id');
        $insuranceChargesId = DB::table('expense_types')->where('name', 'Insurance Charges')->value('id');
        $vehicleOperationalCostId = DB::table('expense_types')->where('name', 'Vehicle Operational Cost')->value('id');
        $managementCostId = DB::table('expense_types')->where('name', 'Management Cost')->value('id');

        // Before renaming, drop the foreign key constraint from the old table
        // This prevents duplicate constraint name errors when the new table is created.
        // Use a try-catch block for robustness in case the foreign key doesn't exist.
        if (Schema::hasTable('operational_costs')) {
            Schema::table('operational_costs', function (Blueprint $table) {
//                try {
//                    // Attempt to drop the foreign key by column name. Laravel will try to find its name.
//                    $table->dropForeign(['mhp_site_id']);
//                } catch (\Exception $e) {
//                    // Log the error or ignore if the foreign key might not exist.
//                    // For example, if this migration is run multiple times or if the FK was never created.
//                    // error_log("Could not drop foreign key 'mhp_site_id' on 'operational_costs': " . $e->getMessage());
//                }
            });
        }

        // Rename the existing 'operational_costs' table to a temporary name
        // Only rename if the original table exists
        if (Schema::hasTable('operational_costs')) {
            Schema::rename('operational_costs', 'operational_costs_old');
        }


        // Create the new 'operational_costs' table with the normalized structure
        Schema::create('operational_costs', function (Blueprint $table) {
            $table->id();
            // Assuming 'mhp_sites' table exists and 'mhp_site_id' is a foreign key
            $table->unsignedBigInteger('mhp_site_id');
            $table->date('cost_date');
            $table->unsignedBigInteger('expense_type_id');
            $table->decimal('amount', 10, 2); // To store the actual cost value
            $table->string('remarks')->nullable(); // Remarks for this specific expense entry
            $table->timestamps();

            // Add foreign key constraints
            $table->foreign('mhp_site_id')->references('id')->on('mhp_sites')->onDelete('cascade');
            $table->foreign('expense_type_id')->references('id')->on('expense_types')->onDelete('cascade');
        });

        // Migrate data from 'operational_costs_old' to the new 'operational_costs' table
        // Only proceed if the old table exists and has data
        if (Schema::hasTable('operational_costs_old')) {
            $oldOperationalCosts = DB::table('operational_costs_old')->get();

            foreach ($oldOperationalCosts as $oldCost) {
                // HR Office Expenses
                if ($oldCost->hr_office_expenses > 0) {
                    DB::table('operational_costs')->insert([
                        'mhp_site_id' => $oldCost->mhp_site_id,
                        'cost_date' => $oldCost->cost_date,
                        'expense_type_id' => $hrOfficeExpensesId,
                        'amount' => $oldCost->hr_office_expenses,
                        'remarks' => null, // Old table didn't have specific remarks per expense type
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                // Financial Charges
                if ($oldCost->financial_charges > 0) {
                    DB::table('operational_costs')->insert([
                        'mhp_site_id' => $oldCost->mhp_site_id,
                        'cost_date' => $oldCost->cost_date,
                        'expense_type_id' => $financialChargesId,
                        'amount' => $oldCost->financial_charges,
                        'remarks' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                // Insurance Charges
                if ($oldCost->insurance_charges > 0) {
                    DB::table('operational_costs')->insert([
                        'mhp_site_id' => $oldCost->mhp_site_id,
                        'cost_date' => $oldCost->cost_date,
                        'expense_type_id' => $insuranceChargesId,
                        'amount' => $oldCost->insurance_charges,
                        'remarks' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                // Vehicle Operational Cost
                if ($oldCost->vehicle_operational_cost > 0) {
                    DB::table('operational_costs')->insert([
                        'mhp_site_id' => $oldCost->mhp_site_id,
                        'cost_date' => $oldCost->cost_date,
                        'expense_type_id' => $vehicleOperationalCostId,
                        'amount' => $oldCost->vehicle_operational_cost,
                        'remarks' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                // Management Cost
                if ($oldCost->management_cost > 0) {
                    DB::table('operational_costs')->insert([
                        'mhp_site_id' => $oldCost->mhp_site_id,
                        'cost_date' => $oldCost->cost_date,
                        'expense_type_id' => $managementCostId,
                        'amount' => $oldCost->management_cost,
                        'remarks' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Reverse the migration:
        // 1. Drop the new 'operational_costs' table
        Schema::dropIfExists('operational_costs');

        // 2. Drop the 'expense_types' table
        Schema::dropIfExists('expense_types');

        // 3. Rename 'operational_costs_old' back to 'operational_costs'
        // Only rename if the old table exists.
        if (Schema::hasTable('operational_costs_old')) {
            Schema::rename('operational_costs_old', 'operational_costs');
        }

        // Re-add the foreign key to the original table if it was dropped in 'up'
        // This is important for a complete rollback.
        if (Schema::hasTable('operational_costs')) {
            Schema::table('operational_costs', function (Blueprint $table) {
                // Ensure the foreign key doesn't already exist before adding to prevent errors
                try {
                    $table->foreign('mhp_site_id')->references('id')->on('mhp_sites')->onDelete('cascade');
                } catch (\Exception $e) {
                    // Log or ignore if the foreign key already exists (e.g., if it was never dropped)
                    // error_log("Could not re-add foreign key 'mhp_site_id' on 'operational_costs': " . $e->getMessage());
                }
            });
        }
    }
};
