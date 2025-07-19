<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMhpSiteRequest;
use App\Http\Requests\UpdateMhpSiteRequest;
use App\Models\Cbo;
use App\Models\MhpSite;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MhpSiteController extends Controller
{
    protected $mhpSiteService;

    // Inject the MhpSiteService into the controller
    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of the MHP Sites.
     */
    public function index(Request $request)
    {
        $query = MhpSite::query()
            ->with([
                'cbo',
                'media', // <--- THIS IS CRUCIAL: Ensure 'media' is here for MhpSite's own attachments
                'adminApproval.media', // For admin approval status and its media
                'completion.media',    // For completion status and its media
                'tAndDWorks.media',    // Load T&D works and their media
                'physicalProgresses.activity', // Eager load the polymorphic activity
                'physicalProgresses.media',    // Eager load physical progress's media
                'financialInstallments.activity', // Eager load the polymorphic activity
                'financialInstallments.media',    // Eager load financial installment's media
                'operationalCosts.expenseType',
                'revenueRecords', // Load revenue records
                'revenueRecords.media',
            ]);

        // Apply filters and search if present
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->whereHas('cbo', function ($cboQuery) use ($searchTerm) {
                    $cboQuery->where('reference_code', 'like', '%' . $searchTerm . '%');
                })
                    ->orWhere('status', 'like', '%' . $searchTerm . '%')
                    ->orWhereRaw('CONCAT(cbos.reference_code, "/MHP-", mhp_sites.id) LIKE ?', ['%' . $searchTerm . '%']) // Search by project_id
                    ->orWhere('id', $searchTerm); // Allow searching by MHP Site ID
            });
        }

        if ($request->has('cbo_id')) {
            $query->where('cbo_id', $request->input('cbo_id'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $mhpSites = $query->paginate(50)->withQueryString();

        // Transform collection to add frontend-specific accessors
        // The transformation for 'attachments' on the $site object itself is often
        // automatically handled by the $appends property in the model, but it's fine here.
        // Ensure media is attached to individual site objects
        $mhpSites->getCollection()->transform(function ($site) {
            // This line is often redundant if 'attachments_frontend' is in $appends
            // and model is serialized, but doesn't hurt.
            // $site->attachments = $site->attachments_frontend;

            // Ensure media is attached to nested relationships if they are used in list summary
            if ($site->adminApproval) {
                $site->adminApproval->attachments = $site->adminApproval->attachments_frontend;
            }
            if ($site->completion) {
                $site->completion->attachments = $site->completion->attachments_frontend;
            }
            // Add similar for TAndDWorks, physicalProgresses, etc. if you show their attachments in the main list
            // (Though physical/financial progress attachments are typically in their respective modals)

            // For nested attachments, ensure their models also have $appends or manually transform
            // Example for T&D if you were showing them directly in the main list:
            // if ($site->tAndDWorks) {
            //     $site->tAndDWorks->each(fn($td) => $td->attachments = $td->attachments_frontend);
            // }
            // Same for physicalProgresses, financialInstallments if their media is displayed directly in list summary.
            // For the purpose of the details modal, they are loaded by MhpSiteController@show anyway.

            // Calculate latest progress summaries for display in table
            $site->latest_physical_progress = $site->physicalProgresses->sortByDesc('progress_date')->first();
            $site->latest_financial_installment = $site->financialInstallments->sortByDesc('installment_date')->first();

            return $site;
        });


        return Inertia::render('MHP/Index', [
            'mhpSites' => $mhpSites,
            'filters' => $request->only('cbo_id', 'status', 'search'),
        ]);
    }

    /**
     * Show the form for creating a new MHP Site. (If you have a dedicated create page)
     */
    public function create()
    {
        // Not used if modal handles creation. If dedicated page, return Inertia render.
        // return Inertia::render('MHP/Create');
    }

    /**
     * Store a newly created MHP Site in storage.
     */
    public function store(StoreMhpSiteRequest $request)
    {
        try {
            $this->mhpSiteService->createMhpSite($request->validated());
            return redirect()->back()->with('success', 'MHP Site created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create MHP Site: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified MHP Site.
     */
    public function show(MhpSite $site)
    {
        // Load all necessary relationships for a detailed view
        $site->load([
            'cbo',
            'media',
            'adminApproval.media',
            'completion.media',
            'tAndDWorks.media',
            'physicalProgresses.activity', // Eager load activity details for progress
            'physicalProgresses.media',
            'financialInstallments.activity', // Eager load activity details for installments
            'financialInstallments.media',
            'operationalCosts.expenseType',
            'revenueRecords', // Assuming RevenueRecord needs its relations loaded
            // Add any other relationships needed for a full site detail view
        ]);

        // Apply attachments_frontend accessors to loaded relationships for consistency
        $site->attachments = $site->attachments_frontend;
        if ($site->adminApproval) $site->adminApproval->attachments = $site->adminApproval->attachments_frontend;
        if ($site->completion) $site->completion->attachments = $site->completion->attachments_frontend;
        foreach ($site->tAndDWorks as $tAndD) $tAndD->attachments = $tAndD->attachments_frontend;
        foreach ($site->physicalProgresses as $progress) $progress->attachments = $progress->attachments_frontend;
        foreach ($site->financialInstallments as $installment) $installment->attachments = $installment->attachments_frontend;
        foreach ($site->revenueRecords as $record) $record->attachments = $record->attachments_frontend; // If RevenueRecord is now using Spatie

        return Inertia::render('MHP/Show', [ // Assuming you might have a Show.vue page
            'mhpSite' => $site,
        ]);
    }

    /**
     * Show the form for editing the specified MHP Site. (If you have a dedicated edit page)
     */
    public function edit(MhpSite $site)
    {
        // Not used if modal handles editing. If dedicated page, return Inertia render.
        // return Inertia::render('MHP/Edit', ['site' => $site]);
    }

    /**
     * Update the specified MHP Site in storage.
     */
    public function update(UpdateMhpSiteRequest $request, MhpSite $site)
    {
        try {
            $this->mhpSiteService->updateMhpSite($site, $request->validated());
            return redirect()->back()->with('success', 'MHP Site updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update MHP Site: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified MHP Site from storage.
     */
    public function destroy(MhpSite $site)
    {
        try {
            $this->mhpSiteService->deleteMhpSite($site);
            return redirect()->back()->with('success', 'MHP Site deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete MHP Site: ' . $e->getMessage());
        }
    }

    // You might also add custom methods for specific actions that don't fit CRUD
    // For example, if you had a specific route to 'updateRevisedCost' directly from the controller,
    // you would refactor it here to call the service method storeOrUpdateAdminApproval or a dedicated method in service.
    public function updateRevisedCost(Request $request, MhpSite $mhpSite, string $field)
    {
        $request->validate([
            'value' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            // Fetch existing approval or create a new one to update a specific field
            $approvalData = [];
            $approvalData[$field] = $request->input('value');

            // Pass existing approval if it exists, otherwise it will create new.
            // Note: This approach assumes you're only updating one field. For multiple, the form is better.
            $this->mhpSiteService->storeOrUpdateAdminApproval($mhpSite, $approvalData);

            return response()->json(['message' => 'Revised cost updated successfully.']);
        } catch (\Exception $e) {
            Log::error('Error updating revised cost: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Failed to update revised cost: ' . $e->getMessage()], 500);
        }
    }

    // Helper for CBO select if needed for filters
    public function getCbos(Request $request)
    {
        $search = $request->input('search');

        $cbos = Cbo::query()
            ->when($search, function ($query) use ($search) {
                // Ensure 'reference_code' exists on your Cbo model/table
                $query->where('reference_code', 'like', '%' . $search . '%')
                    ->orWhere('village', 'like', '%' . $search . '%'); // Or any other searchable field
            })
            ->select('id', 'reference_code') // Crucial: Select 'id' and 'reference_code'
            ->limit(10) // Limit results for performance
            ->get();

        // Very important: return a JSON response directly
        return response()->json($cbos); // The frontend expects an array of CBO objects
    }
}
