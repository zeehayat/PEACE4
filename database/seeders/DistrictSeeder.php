<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\District;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts = [
            'Swat',
            'Dir upper',
            'Dir lower',
            'Chitral',
            'Chitral lower',
            'Chitral upper',

            'Shangla',
            'North Waziristan',
            'South Waziristan',
            'Kurram',
        ];

        // Ensure only the requested districts remain seeded
        District::whereNotIn('name', $districts)->delete();

        foreach ($districts as $districtName) {
            District::firstOrCreate(['name' => $districtName]);
        }
    }
}
