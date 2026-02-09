<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Inspect the found T&D work
$tandd = \App\Models\TAndDWork::find(1);
if ($tandd) {
    echo "T&D Work ID: " . $tandd->id . "\n";
    echo "Projectable Type: '" . $tandd->projectable_type . "'\n";
    echo "Projectable ID: '" . $tandd->projectable_id . "'\n";
    echo "Attributes: " . json_encode($tandd->getAttributes(), JSON_PRETTY_PRINT) . "\n";
}

// Check if any T&D work has a valid projectable_id
$validTandd = \App\Models\TAndDWork::whereNotNull('projectable_id')->where('projectable_id', '!=', '')->first();
if ($validTandd) {
    echo "\nFound T&D Work with valid projectable_id (ID: {$validTandd->id})\n";
    echo "Linked to: " . $validTandd->projectable_type . " ID: " . $validTandd->projectable_id . "\n";
    
    // Try to load the relation
    $related = $validTandd->projectable;
    if ($related) {
        echo "Successfully loaded related model: " . get_class($related) . " ID: " . $related->id . "\n";
    } else {
        echo "Failed to load related model.\n";
    }
} else {
    echo "\nNo T&D Work with valid projectable_id found.\n";
}
