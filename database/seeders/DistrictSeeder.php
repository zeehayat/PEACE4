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
        $kpDistricts = [
            'Peshawar', 'Mardan', 'Swabi', 'Charsadda', 'Nowshera',
            'Kohat', 'Hangu', 'Karak', 'Bannu', 'Lakki Marwat',
            'Dera Ismail Khan', 'Tank', 'Abbottabad', 'Mansehra', 'Haripur',
            'Battagram', 'Torghar', 'Kohistan Upper', 'Kohistan Lower', 'Kolai-Palas',
            'Malakand', 'Dir Upper', 'Dir Lower', 'Swat', 'Bunner',
            'Shangla', 'Chitral Upper', 'Chitral Lower', 'Bajaur', 'Mohmand',
            'Khyber', 'Kurram', 'Orakzai', 'North Waziristan', 'South Waziristan',
        ];

        foreach ($kpDistricts as $districtName) {
            District::firstOrCreate(['name' => $districtName . ' District']);
        }
    }
}
