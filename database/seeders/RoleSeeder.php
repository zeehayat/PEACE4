<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            'root', 'admin', 'mhp', 'irrigation', 'mhp-irrigation',
            'cbo', 'cbo-mhp-irrigation', 'procurement', 'kpo', 'reporter'
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }


}
