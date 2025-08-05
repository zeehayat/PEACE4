<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Cbo;
use App\Models\District; // Import District model
use Illuminate\Support\Facades\Log;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // --- 1. Define Permissions ---
        // General Permissions
        $viewReports = Permission::firstOrCreate(['name' => 'view reports']);
        $manageUsers = Permission::firstOrCreate(['name' => 'manage users']);
        $assignRoles = Permission::firstOrCreate(['name' => 'assign roles']);
        $doAnything = Permission::firstOrCreate(['name' => 'do anything']); // Root permission

        // CBO Module Permissions
        $createCbo = Permission::firstOrCreate(['name' => 'create cbo']);
        $viewCbo = Permission::firstOrCreate(['name' => 'view cbo']);
        $updateCbo = Permission::firstOrCreate(['name' => 'update cbo']);
        $deleteCbo = Permission::firstOrCreate(['name' => 'delete cbo']);

        // MHP Module Permissions
        $createMhpSite = Permission::firstOrCreate(['name' => 'create mhp site']);
        $viewMhpSite = Permission::firstOrCreate(['name' => 'view mhp site']);
        $updateMhpSite = Permission::firstOrCreate(['name' => 'update mhp site']);
        $deleteMhpSite = Permission::firstOrCreate(['name' => 'delete mhp site']);
        $manageMhpAdminApproval = Permission::firstOrCreate(['name' => 'manage mhp admin approval']);
        $manageMhpTAndDWork = Permission::firstOrCreate(['name' => 'manage mhp t&d work']);
        $manageMhpPhysicalProgress = Permission::firstOrCreate(['name' => 'manage mhp physical progress']);
        $manageMhpFinancialInstallment = Permission::firstOrCreate(['name' => 'manage mhp financial installment']);
        $manageMhpCompletion = Permission::firstOrCreate(['name' => 'manage mhp completion']);

        // Irrigation Module Permissions
        $createIrrigationScheme = Permission::firstOrCreate(['name' => 'create irrigation scheme']);
        $viewIrrigationScheme = Permission::firstOrCreate(['name' => 'view irrigation scheme']);
        $updateIrrigationScheme = Permission::firstOrCreate(['name' => 'update irrigation scheme']);
        $deleteIrrigationScheme = Permission::firstOrCreate(['name' => 'delete irrigation scheme']);
        $manageIrrigationAdminApproval = Permission::firstOrCreate(['name' => 'manage irrigation admin approval']);
        $manageIrrigationPhysicalProgress = Permission::firstOrCreate(['name' => 'manage irrigation physical progress']);
        $manageIrrigationFinancialInstallment = Permission::firstOrCreate(['name' => 'manage irrigation financial installment']);
        $manageIrrigationContract = Permission::firstOrCreate(['name' => 'manage irrigation contract']);
        $manageIrrigationCompletion = Permission::firstOrCreate(['name' => 'manage irrigation completion']);

        // LRM Module Permissions
        $createLrmCommittee = Permission::firstOrCreate(['name' => 'create lrm committee']);
        $viewLrmCommittee = Permission::firstOrCreate(['name' => 'view lrm committee']);
        $updateLrmCommittee = Permission::firstOrCreate(['name' => 'update lrm committee']);
        $deleteLrmCommittee = Permission::firstOrCreate(['name' => 'delete lrm committee']);

        // Vendor Module Permissions
        $createVendor = Permission::firstOrCreate(['name' => 'create vendor']);
        $viewVendor = Permission::firstOrCreate(['name' => 'view vendor']);
        $updateVendor = Permission::firstOrCreate(['name' => 'update vendor']);
        $deleteVendor = Permission::firstOrCreate(['name' => 'delete vendor']);


        // --- 2. Define Roles ---
        // Create roles first to ensure they exist before assigning permissions or users
        $rootRole = Role::firstOrCreate(['name' => 'Root']);
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $meHoRole = Role::firstOrCreate(['name' => 'M&E-HO']);
        $engineerHoRole = Role::firstOrCreate(['name' => 'Engineer-HO']);
        $kpoHoRole = Role::firstOrCreate(['name' => 'KPO-HO']);
        $viewerHoRole = Role::firstOrCreate(['name' => 'Viewer-HO']);
        $meDistrictRole = Role::firstOrCreate(['name' => 'M&E-DISTRICT']);
        $engineerDistrictRole = Role::firstOrCreate(['name' => 'Engineer-DISTRICT']);
        $kpoDistrictRole = Role::firstOrCreate(['name' => 'KPO-DISTRICT']);
        $viewerDistrictRole = Role::firstOrCreate(['name' => 'Viewer-DISTRICT']);

        // --- 3. Assign Permissions to Roles ---

        // Root Role: Can do anything
        $rootRole->givePermissionTo(Permission::all());

        // Admin Role: Can manage users/roles, access all reports, update/delete any activity
        $adminRole->givePermissionTo([
            $viewReports, $manageUsers, $assignRoles,
            $updateCbo, $deleteCbo,
            $updateMhpSite, $deleteMhpSite, $manageMhpAdminApproval, $manageMhpTAndDWork, $manageMhpPhysicalProgress, $manageMhpFinancialInstallment, $manageMhpCompletion,
            $updateIrrigationScheme, $deleteIrrigationScheme, $manageIrrigationAdminApproval, $manageIrrigationPhysicalProgress, $manageIrrigationFinancialInstallment, $manageIrrigationContract, $manageIrrigationCompletion,
            $updateLrmCommittee, $deleteLrmCommittee,
            $updateVendor, $deleteVendor,
        ]);

        // KPO-DISTRICT: Can create/store records for their district
        $kpoDistrictRole->givePermissionTo([
            $createCbo,
            $createMhpSite, $manageMhpAdminApproval, $manageMhpTAndDWork, $manageMhpPhysicalProgress, $manageMhpFinancialInstallment, $manageMhpCompletion,
            $createIrrigationScheme, $manageIrrigationAdminApproval, $manageIrrigationPhysicalProgress, $manageIrrigationFinancialInstallment, $manageIrrigationContract, $manageIrrigationCompletion,
            $createLrmCommittee,
            $createVendor,
        ]);

        // Viewer-DISTRICT: Can view reports for their district
        $viewerDistrictRole->givePermissionTo([
            $viewReports,
            $viewCbo, $viewMhpSite, $viewIrrigationScheme, $viewLrmCommittee, $viewVendor,
        ]);

        // M&E-DISTRICT: CBO CRUD (own district), Read-only MHP/Irrigation, Reports, View Vendor
        $meDistrictRole->givePermissionTo([
            $createCbo, $viewCbo, $updateCbo, $deleteCbo,
            $viewMhpSite, $viewIrrigationScheme, $viewReports, $viewVendor,
        ]);

        // Engineer-DISTRICT: Irrigation/MHP/CBO CRUD (own district), Reports, View Vendor
        $engineerDistrictRole->givePermissionTo([
            $createCbo, $viewCbo, $updateCbo, $deleteCbo,
            $createMhpSite, $viewMhpSite, $updateMhpSite, $deleteMhpSite,
            $createIrrigationScheme, $viewIrrigationScheme, $updateIrrigationScheme, $deleteIrrigationScheme,
            $viewReports, $viewVendor,
        ]);

        // HO Roles: Inherit permissions from District counterparts
        $meHoRole->givePermissionTo($meDistrictRole->permissions);
        $engineerHoRole->givePermissionTo($engineerDistrictRole->permissions);
        $kpoHoRole->givePermissionTo($kpoDistrictRole->permissions);
        $viewerHoRole->givePermissionTo($viewerDistrictRole->permissions);


        // --- 4. Create Users and Assign Roles ---
        // Ensure some specific districts exist for user assignment
        $swabiDistrict = District::firstOrCreate(['name' => 'Swabi District']);
        $mardanDistrict = District::firstOrCreate(['name' => 'Mardan District']);
        $peshawarDistrict = District::firstOrCreate(['name' => 'Peshawar District']);

        $rootUser = User::firstOrCreate(
            ['email' => 'root@example.com'],
            [
                'name' => 'Root User',
                'password' => Hash::make('password'),
                'district_id' => $peshawarDistrict->id,
            ]
        );
        $rootUser->assignRole('Root');
        Log::info('Root user created/assigned.');

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'district_id' => $mardanDistrict->id,
            ]
        );
        $adminUser->assignRole('Admin');
        Log::info('Admin user created/assigned.');

        $kpoDistrictUser = User::firstOrCreate(
            ['email' => 'kpo.swabi@example.com'],
            [
                'name' => 'KPO Swabi User',
                'password' => Hash::make('password'),
                'district_id' => $swabiDistrict->id,
            ]
        );
        $kpoDistrictUser->assignRole('KPO-DISTRICT');
        Log::info('KPO District user created/assigned.');

        $engineerHoUser = User::firstOrCreate(
            ['email' => 'engineer.ho@example.com'],
            [
                'name' => 'Engineer HO User',
                'password' => Hash::make('password'),
                'district_id' => null, // HO users typically don't have a specific district_id
            ]
        );
        $engineerHoUser->assignRole('Engineer-HO');
        Log::info('Engineer HO user created/assigned.');
    }
}
