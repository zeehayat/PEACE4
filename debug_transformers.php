<?php

use App\Models\MhpSite;
use App\Services\MhpReportService;

// Find a site with T&D works to test
$mhpSite = MhpSite::whereHas('tAndDWorks')->first();

if (!$mhpSite) {
    echo "No MHP Site with T&D Works found.\n";
    exit;
}

echo "Inspecting MHP Site ID: " . $mhpSite->id . "\n";

$service = new MhpReportService($mhpSite);

echo "Current Total Transformers Count (via Service): " . $service->getTotalTransformersCount() . "\n";

echo "--- T&D Works Data ---\n";
foreach ($mhpSite->tAndDWorks as $work) {
    echo "Work ID: " . $work->id . "\n";
    echo "Step Up Transformers: " . json_encode($work->step_up_transformers) . "\n";
    echo "Step Down Transformers: " . json_encode($work->step_down_transformers) . "\n";
}

echo "--- EME Info Data ---\n";
if ($mhpSite->emeInfo) {
    echo "EME Work ID: " . $mhpSite->emeInfo->id . "\n";
    echo "No of Step Up Transformers (EME): " . $mhpSite->emeInfo->no_of_step_up_transformers . "\n";
} else {
    echo "No EME Info found.\n";
}
