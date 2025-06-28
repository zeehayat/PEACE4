<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class UserAndPermissionSeeder extends Seeder
{
    public function run()
    {
        // Define roles
        $roles = ['root', 'admin', 'mhp', 'irrigation', 'mhp-irrigation', 'cbo', 'cbo-mhp-irrigation', 'procurement', 'kpo', 'reporter'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Define permissions
        $permissions = [
            'view_cbo', 'create_cbo', 'update_cbo', 'delete_cbo',
            'view_mhp', 'create_mhp', 'update_mhp', 'delete_mhp',
            'view_procurement', 'create_procurement', 'update_procurement', 'delete_procurement',
            'manage_users', 'assign_roles'
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign permissions to roles
        Role::findByName('admin')->givePermissionTo($permissions);
        Role::findByName('root')->givePermissionTo($permissions);
        Role::findByName('cbo')->givePermissionTo(['view_cbo', 'create_cbo']);
        Role::findByName('mhp')->givePermissionTo(['view_mhp', 'create_mhp']);
        Role::findByName('procurement')->givePermissionTo(['view_procurement']);

        // Create example users
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin User', 'password' => Hash::make('password')]
        );
        $admin->assignRole('admin');

        $cboUser = User::firstOrCreate(
            ['email' => 'cbo@example.com'],
            ['name' => 'CBO Officer', 'password' => Hash::make('password')]
        );
        $cboUser->assignRole('cbo');

        $root = User::firstOrCreate(
            ['email' => 'root@example.com'],
            ['name' => 'Root User', 'password' => Hash::make('password')]
        );
        $root->assignRole('root');
    }
}
