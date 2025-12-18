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
            'Dir Upper',
            'Dir Lower',
            'Chitral Lower',
            'Chitral Upper',
            'Chitral',
            'North Waziristan',
            'South Waziristan',
            'Kurram',
            'Swat',
        ];

        // Ensure only the requested districts remain seeded
        District::whereNotIn('name', $districts)->delete();

        foreach ($districts as $districtName) {
            District::firstOrCreate(['name' => $districtName]);
        }
    }
}
