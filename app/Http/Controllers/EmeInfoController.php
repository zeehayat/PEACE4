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
            
            'estimated_cost' => 'nullable|numeric',
            'initiation_date' => 'nullable|date',
            'completion_date' => 'nullable|date',

            // Procurement
            'advertisement_date' => 'nullable|date',
            'pre_bid_meeting_date' => 'nullable|date',
            'technical_bid_opening_date' => 'nullable|date',
            'financial_bid_opening_date' => 'nullable|date',
            'contract_award_date' => 'nullable|date',
            'contractor_amount' => 'nullable|numeric',

            // Progress
            'financial_progress_percent' => 'nullable|numeric|min:0|max:100',
            'amount_disbursed' => 'nullable|numeric',
            'amount_remaining' => 'nullable|numeric',
            'physical_progress_percent' => 'nullable|numeric|min:0|max:100',
            'progress_description' => 'nullable|string',
            
            // Attachments
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
            'attachments_to_delete' => 'nullable|array',
        ]);

        // 3. Use updateOrCreate to either create or update the record
        $emeInfo = $site->emeInfo()->updateOrCreate( // <-- Use $site
            ['mhp_site_id' => $site->id], // <-- Use $site
            $validated
        );

        // 4. Handle Attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $emeInfo->addMedia($file)->toMediaCollection('attachments');
            }
        }

        if ($request->filled('attachments_to_delete')) {
            foreach ($request->input('attachments_to_delete') as $mediaId) {
                $media = $emeInfo->media()->find($mediaId);
                if ($media) {
                    $media->delete();
                }
            }
        }

        // 4. Redirect back with a success message
        return redirect()->back()->with('success', 'EME Profile saved successfully!');
    }
}
