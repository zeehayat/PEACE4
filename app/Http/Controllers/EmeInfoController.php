<?php

namespace App\Http\Controllers;

use App\Models\EmeInfo;
use App\Models\MhpSite;
use Illuminate\Http\Request;

class EmeInfoController extends Controller
{
    /**
     * Store or update the EME information for a specific MHP Site.
     */
    public function store(Request $request, MhpSite $site)
    {
        // 1. Authorize the action using our new policy
        $this->authorize('storeOrUpdate', [EmeInfo::class, $site]); // <-- Use $site

        // 2. Validate the incoming data
        $validated = $request->validate([
            'turbine_capacity_kw' => 'nullable|numeric',
            'turbine_type' => 'nullable|string|max:255',
            'turbine_no' => 'nullable|string|max:255',
            'governor_type' => 'nullable|string|max:255',
            'governor_no' => 'nullable|string|max:255',
            'generator_alternator_capacity' => 'nullable|numeric',
            'stepup_transformer_capacity' => 'nullable|numeric',
            'no_of_step_up_transformers' => 'nullable|integer',
            'scada_system' => 'boolean',
            'scada_system_model' => 'nullable|string|max:255',
            'station_generator_capacity' => 'nullable|numeric',
            'penstock_pipe' => 'nullable|string|max:255',
            'no_of_penstock_pipe' => 'nullable|integer',
        ]);

        // 3. Use updateOrCreate to either create or update the record
        $site->emeInfo()->updateOrCreate( // <-- Use $site
            ['mhp_site_id' => $site->id], // <-- Use $site
            $validated
        );

        // 4. Redirect back with a success message
        return redirect()->back()->with('success', 'EME Profile saved successfully!');
    }
}
