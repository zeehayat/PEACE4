<?php

use App\Models\MhpSite;
use App\Models\TAndDWork;
use App\Services\MhpReportService;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// 1. Find or Create MHP Site
$site = MhpSite::first();
if (!$site) {
    $site = MhpSite::create(['cbo_id' => 1, 'status' => 'New']); 
    // minimal creation, might fail if other fields required, but assuming valid site exists from previous output
}

// 2. Find or Create T&D Work and Link it
$tandd = TAndDWork::find(1);
if (!$tandd) {
    $tandd = new TAndDWork();
}

// User provided data
// step_up: [{"kva": "1600", "qty": "2"}]
// step_down: [{"kva": "200", "qty": "7"}, {"kva": "100", "qty": "9"}, {"kva": "50", "qty": "2"}]
$tandd->step_up_transformers = [['kva' => "1600", 'qty' => "2"]];
$tandd->step_down_transformers = [
    ['kva' => "200", 'qty' => "7"],
    ['kva' => "100", 'qty' => "9"],
    ['kva' => "50", 'qty' => "2"]
];

// Manually associate for this test execution
$tandd->projectable_type = 'mhp_site'; // Use the morph map alias!
$tandd->projectable_id = $site->id;
$tandd->save();

echo "Linked T&D Work {$tandd->id} to MHP Site {$site->id} with User Data.\n";
echo "Attributes: " . json_encode($tandd->getAttributes()) . "\n";

// 3. (Optional) Create a SECOND T&D work to verify aggregation
// We'll delete formatting logic for now to focus on the single main record
TAndDWork::where('id', '!=', $tandd->id)->delete();


// 4. Test Service
DB::enableQueryLog();

$site = $site->fresh(['tAndDWorks']); // Explicitly load relation
$log = DB::getQueryLog();
print_r($log);

$service = new MhpReportService($site);

echo "Loaded T&D Works Count: " . $site->tAndDWorks->count() . "\n";
foreach ($site->tAndDWorks as $work) {
    echo "Work ID: {$work->id}\n";
    echo "  Step Up: " . print_r($work->step_up_transformers, true) . "\n";
    echo "  Step Down: " . print_r($work->step_down_transformers, true) . "\n";
    
    // Test the logic manually
    $items = $work->step_up_transformers;
    $sum = collect($items ?? [])->sum(fn($item) => (int) ($item['qty'] ?? 0));
    echo "  Manual Sum Step Up: $sum\n";
}

$count = $service->getTotalTransformersCount();

echo "\n--- Result ---\n";
echo "Total Transformers Count: $count\n";
echo "Expected: 10 (5 + 2 + 3)\n";

// Cleanup (optional, but good for repeatability)
$tandd->projectable_id = null;
$tandd->projectable_type = null;
$tandd->save();
$tandd2->delete();
