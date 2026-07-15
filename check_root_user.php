<?php

require __DIR__ . '/bootstrap/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::where('email', 'root@srsp.pk')->first();
if ($user) {
    echo "USER FOUND: " . $user->name . "\n";
    echo "ROLES: " . implode(', ', $user->getRoleNames()->toArray()) . "\n";
    echo "PERMISSIONS DIRECTLY: " . implode(', ', $user->permissions->pluck('name')->toArray()) . "\n";
    echo "HAS PERMISSION mhp_site_update: " . ($user->can('mhp_site_update') ? 'YES' : 'NO') . "\n";
} else {
    echo "USER NOT FOUND\n";
}
