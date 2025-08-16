<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIrrigationSchemeRequest;
use App\Http\Requests\UpdateIrrigationSchemeRequest;
use App\Models\IrrigationScheme;
use App\Services\IrrigationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\District;
use App\Http\Controllers\Controller;

class IrrigationSchemeController extends Controller
{
    protected $irrigationService;

    public function __construct(IrrigationService $irrigationService)
    {
        $this->irrigationService = $irrigationService;

        // This single line applies all policy checks for the resource controller.
        $this->authorizeResource(IrrigationScheme::class, 'scheme');

    }

    /**
     * Display a listing of the irrigation schemes.
     */
    public function index(Request $request)
    {
        // The policy check for 'viewAny' is now automatically handled.
        $query = IrrigationScheme::query()->forUser(Auth::user())
            ->with([
                'cbo',
                'profile',
                'media',
                'adminApproval.media',
                'irrigation_completion.media',
                'irrigationSchemeContract.media',
                'latestPhysicalProgress',
                'latestFinancialInstallment',
            ]);


        $user = Auth::user();
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function ($q) use ($user) {
                $q->where('district', $user->district->name);
            });
            Log::info('IrrigationSchemeController@index: Scoping Irrigation Schemes by user district.', ['user_id' => $user->id, 'district' => $user->district->name]);
        }

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->whereHas('cbo', function ($q) use ($searchTerm) {
                $q->where('reference_code', 'like', '%' . $searchTerm . '%');
            })
                ->orWhere('status', 'like', '%' . $searchTerm . '%');
        }

        $irrigationSchemes = $query->paginate(50)->withQueryString();
       // dd($irrigationSchemes->where('id', 11)->first()->latestPhysicalProgress);

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
        // Policy check for creating a scheme is automatically handled by authorizeResource.
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
        // Policy check for viewing a specific scheme is automatically handled by authorizeResource.
        $scheme->load(['cbo', 'profile.media', 'media', 'adminApproval.media', 'irrigation_completion.media', 'irrigationSchemeContract.media', 'physicalProgresses.media', 'financialInstallments.media', 'latestPhysicalProgress', 'latestFinancialInstallment']);
        return response()->json(['scheme' => $scheme]);
    }

    /**
     * Update the specified Irrigation Scheme in storage.
     */
    public function update(UpdateIrrigationSchemeRequest $request, IrrigationScheme $scheme)
    {
        // Policy check for updating a specific scheme is automatically handled by authorizeResource.
        try {
            $this->irrigationService->updateIrrigationScheme($scheme, $request->validated());
            return redirect()->route('irrigation.schemes.index')->with('success', 'Irrigation Scheme updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Scheme: ' . e->getMessage(), ['exception' => e]);
            return redirect()->back()->with('error', 'Failed to update Irrigation Scheme: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified Irrigation Scheme from storage.
     */
    public function destroy(IrrigationScheme $scheme)
    {
        // Policy check for deleting a specific scheme is automatically handled by authorizeResource.
        try {
            $this->irrigationService->deleteIrrigationScheme($scheme);
            return redirect()->route('irrigation.schemes.index')->with('success', 'Irrigation Scheme deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Irrigation Scheme: ' . $e->getMessage());
        }
    }

    /**
     * Get irrigation schemes for searchable select input.
     */
    public function getSchemes(Request $request)
    {
        // Policy check for the ability to view any scheme is still needed here.
        // It's a best practice to protect API endpoints as well.
        $this->authorize('viewAny', IrrigationScheme::class);


        $query = IrrigationScheme::query();
        $user = Auth::user();
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function ($q) use ($user) {
                $q->where('district', $user->district->name);
            });
        }

        $search = $request->input('search');

        $schemes = $query
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
