<?php

use App\Models\MhpSite;
use App\Models\TAndDWork;
use App\Services\MhpReportService;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Test Site 5 (which we know has a linked T&D work now)
$siteId = 5;
echo "--- Testing Site ID: $siteId ---\n";

$site = MhpSite::find($siteId);
if (!$site) {
    echo "Site $siteId not found!\n";
    exit;
}

echo "Site Found: {$site->name}\n";
echo "MhpSite DB Columns -> HT: " . ($site->tl_ht_km ?? 'NULL') . ", LT: " . ($site->tl_lt_km ?? 'NULL') . "\n";

// Check Raw DB for T&D Works
$rawWorks = DB::table('transmission_and_distribution_works')
    ->where('projectable_id', $siteId)
    ->where('projectable_type', 'mhp_site')
    ->get();

echo "Raw DB T&D Works Count (projectable_type='mhp_site'): " . $rawWorks->count() . "\n";
foreach ($rawWorks as $work) {
    echo " - ID: {$work->id}, HT: {$work->ht_conductor_length_km}\n";
}

// Check Eloquent Relationship
$tAndDWorks = $site->tAndDWorks;
echo "Eloquent tAndDWorks Count: " . $tAndDWorks->count() . "\n";

$first = $tAndDWorks->sortByDesc('date_of_initiation')->first();
if ($first) {
    echo "First Work (Eloquent) -> ID: {$first->id}, HT: {$first->ht_conductor_length_km}\n";
} else {
    echo "First Work (Eloquent) -> NULL\n";
}

// Check Service
$service = new MhpReportService($site);
echo "Service getHtConductorLengthKm(): " . $service->getHtConductorLengthKm() . "\n";
echo "Service getLtConductorLengthKm(): " . $service->getLtConductorLengthKm() . "\n";
