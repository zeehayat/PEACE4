<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Use DB facade for direct insertion if models aren't readily available

class WayfinderMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // First, create a 'main' menu entry (if Wayfinder expects a 'menus' table)
        // Check your Wayfinder migrations and documentation for exact table structure.
        // Assuming 'menus' table exists and needs an entry for 'main'
        $mainMenuId = DB::table('menus')->insertGetId([
            'name' => 'main-navigation', // This name will be used to fetch the menu
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Define your main navigation items
        // Parent items
        $mhpMenuId = DB::table('menu_items')->insertGetId([
            'menu_id' => $mainMenuId,
            'parent_id' => null,
            'title' => 'MHP Sites',
            'url' => route('mhp.index', [], false), // Use route helper, false for relative URL
            'target' => '_self',
            'icon_class' => 'zap', // Class for your icon font/SVG
            'order' => 1,
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $irrigationMenuId = DB::table('menu_items')->insertGetId([
            'menu_id' => $mainMenuId,
            'parent_id' => null,
            'title' => 'Irrigation Schemes',
            'url' => route('irrigation.irrigation-schemes.index', [], false),
            'target' => '_self',
            'icon_class' => 'droplet',
            'order' => 2,
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $reportsMenuId = DB::table('menu_items')->insertGetId([
            'menu_id' => $mainMenuId,
            'parent_id' => null,
            'title' => 'Reports',
            'url' => null, // This is a parent, no direct URL
            'target' => '_self',
            'icon_class' => 'clipboard',
            'order' => 3,
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Sub-items for Reports
        DB::table('menu_items')->insert([
            'menu_id' => $mainMenuId,
            'parent_id' => $reportsMenuId,
            'title' => 'CBO Report',
            'url' => route('cbo.report', [], false),
            'target' => '_self',
            'icon_class' => 'file-text',
            'order' => 1,
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Dashboard (top-level)
        DB::table('menu_items')->insert([
            'menu_id' => $mainMenuId,
            'parent_id' => null,
            'title' => 'Dashboard',
            'url' => route('dashboard', [], false),
            'target' => '_self',
            'icon_class' => 'home',
            'order' => 0,
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // You can add more sub-items or top-level items as needed
    }
}
