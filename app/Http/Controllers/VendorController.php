<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVendorRequest;
use App\Http\Requests\UpdateVendorRequest;
use App\Models\Vendor;
use App\Services\VendorService; // Import the VendorService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class VendorController extends Controller
{
    protected $vendorService;

    public function __construct(VendorService $vendorService)
    {
        $this->vendorService = $vendorService;
        // FIX: Apply policy middleware for Vendor model
        $this->authorizeResource(Vendor::class, 'vendor');
    }

    /**
     * Display a listing of the Vendors.
     */
    public function index(Request $request)
    {
        $query = Vendor::query()->with('media');

        // Vendors are assumed to be accessible globally to all roles with 'view vendor' permission
        // No district scoping needed here.

        // Apply filters and search if present
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('contact_person', 'like', '%' . $searchTerm . '%')
                    ->orWhere('phone', 'like', '%' . $searchTerm . '%')
                    ->orWhere('email', 'like', '%' . $searchTerm . '%')
                    ->orWhere('address', 'like', '%' . $searchTerm . '%')
                    ->orWhere('ntn_no', 'like', '%' . $searchTerm . '%');
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $vendors = $query->paginate(10)->withQueryString();

        $vendors->getCollection()->transform(function ($vendor) {
            return $vendor;
        });

        return Inertia::render('Vendor/Index', [
            'vendors' => $vendors,
            'filters' => $request->only('search', 'status'),
        ]);
    }


    /**
     * Store a newly created Vendor in storage.
     */
    public function store(StoreVendorRequest $request)
    {
        try {
            $this->vendorService->createVendor($request->validated());
            return redirect()->route('vendor.vendors.index')->with('success', 'Vendor created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Vendor: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create Vendor: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified Vendor.
     */
    public function show(Vendor $vendor)
    {
        $vendor->load('media'); // Ensure media is loaded
        return response()->json($vendor); // Return as JSON for modal or API
    }

    /**
     * Update the specified Vendor in storage.
     */
    public function update(UpdateVendorRequest $request, Vendor $vendor)
    {
        try {
            $this->vendorService->updateVendor($vendor, $request->validated());
            return redirect()->back()->with('success', 'Vendor updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Vendor: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Vendor: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified Vendor from storage.
     */
    public function destroy(Vendor $vendor)
    {
        try {
            $this->vendorService->deleteVendor($vendor);
            return redirect()->back()->with('success', 'Vendor deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Vendor: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Vendor: ' . $e->getMessage());
        }
    }

    /**
     * Get vendors for searchable select input.
     * This is an API endpoint, used by SearchableVendorSelect component.
     * (This method was already provided and adjusted in previous steps, ensuring consistency).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVendors(Request $request)
    {
        $search = $request->input('search');

        $vendors = Vendor::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('contact_person', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            })
            ->select('id', 'name', 'contact_person', 'phone', 'email') // Select necessary fields for display
            ->limit(10)
            ->get();

        return response()->json($vendors);
    }
}
