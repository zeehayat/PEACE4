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
    public function store(Request $request, MhpSite $mhpSite)
    {
        // 1. Authorize the action using our new policy
        $this->authorize('storeOrUpdate', [EmeInfo::class, $mhpSite]);

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
        $mhpSite->emeInfo()->updateOrCreate(
            ['mhp_site_id' => $mhpSite->id], // Conditions to find the record
            $validated // The data to update or create with
        );

        return back()->with('success', 'EME Profile saved successfully!');
    }
}
