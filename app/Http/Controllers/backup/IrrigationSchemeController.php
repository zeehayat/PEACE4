<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIrrigationSchemeRequest;
use App\Http\Requests\UpdateIrrigationSchemeRequest;
use App\Models\IrrigationScheme;
use App\Services\IrrigationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class IrrigationSchemeController extends Controller
{
    protected $irrigationService;

    public function __construct(IrrigationService $irrigationService)
    {
        $this->irrigationService = $irrigationService;
    }

    /**
     * Display a listing of the irrigation schemes.
     */
    public function index(Request $request)
    {
        $query = IrrigationScheme::query()
            ->with([
                'cbo',
                'profile',
                'media',
                'adminApproval.media',
                // FIX: Remove 'irrigationSchemeContract' from eager loading in the index view
                'irrigation_completion.media', // FIX: Use the correct relationship name
                'physicalProgresses.media',
                'financialInstallments.media',
            ]);

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->whereHas('cbo', function ($q) use ($searchTerm) {
                $q->where('reference_code', 'like', '%' . $searchTerm . '%');
            })
                ->orWhere('status', 'like', '%' . $searchTerm . '%');
        }

        $irrigationSchemes = $query->paginate(50)->withQueryString();

        $irrigationSchemes->getCollection()->transform(function ($scheme) {
            // Transform related media to be available as a simple attachments_frontend array
            if ($scheme->profile) {
                $scheme->profile->attachments = $scheme->profile->attachments_frontend;
            }
            if ($scheme->adminApproval) {
                $scheme->adminApproval->attachments = $scheme->adminApproval->attachments_frontend;
            }
            if ($scheme->irrigation_completion) {
                $scheme->irrigation_completion->attachments = $scheme->irrigation_completion->attachments_frontend;
            }
            if ($scheme->irrigationSchemeContract) {
                $scheme->irrigationSchemeContract->attachments = $scheme->irrigationSchemeContract->attachments_frontend;
            }

            // Add summary counts for the list view
            $scheme->physical_progress_count = $scheme->physicalProgresses->count();
            $scheme->financial_installments_count = $scheme->financialInstallments->count();
            return $scheme;
        });

        return Inertia::render('Irrigation/Index', [
            'irrigationSchemes' => $irrigationSchemes,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Store a newly created Irrigation Scheme in storage.
     */
    public function store(StoreIrrigationSchemeRequest $request)
    {
        try {
            $this->irrigationService->createIrrigationScheme($request->validated());
            return redirect()->route('irrigation.schemes.index')->with('success', 'Irrigation Scheme created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create Irrigation Scheme: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified Irrigation Scheme.
     */
    public function show(IrrigationScheme $scheme)
    {
        $scheme->load([
            'cbo',
            'profile.media',
            'media',
            'adminApproval.media',
            'irrigation_completion.media',
            'irrigationSchemeContract.media',
            'physicalProgresses.media',
            'financialInstallments.media',
        ]);
        return response()->json(['scheme' => $scheme]);
    }

    /**
     * Update the specified Irrigation Scheme in storage.
     */
    public function update(UpdateIrrigationSchemeRequest $request, IrrigationScheme $scheme)
    {
        try {
            $this->irrigationService->updateIrrigationScheme($scheme, $request->validated());
            return redirect()->route('irrigation.schemes.index')->with('success', 'Irrigation Scheme updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Irrigation Scheme: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified Irrigation Scheme from storage.
     */
    public function destroy(IrrigationScheme $scheme)
    {
        try {
            $this->irrigationService->deleteIrrigationScheme($scheme);
            return redirect()->route('irrigation.schemes.index')->with('success', 'Irrigation Scheme deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Irrigation Scheme: ' . $e->getMessage());
        }
    }

    /**
     * Get irrigation schemes for searchable select input (e.g., for related entity forms).
     */
    public function getSchemes(Request $request)
    {
        $search = $request->input('search');

        $schemes = IrrigationScheme::query()
            ->when($search, function ($query) use ($search) {
                $query->whereHas('cbo', function ($q) use ($search) {
                    $q->where('reference_code', 'like', '%' . $search . '%');
                });
            })
            ->select('id')
            ->with('cbo:id,reference_code')
            ->limit(10)
            ->get();

        return response()->json($schemes);
    }
}
