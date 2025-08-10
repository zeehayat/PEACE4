<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Http\Requests\UpdateProjectPhysicalProgressRequest;
use App\Models\IrrigationScheme;
use App\Models\ProjectPhysicalProgress;
use App\Services\IrrigationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Gate;

class IrrigationPhysicalProgressController extends Controller
{
    protected $irrigationService;

    public function __construct(IrrigationService $irrigationService)
    {
        $this->irrigationService = $irrigationService;

        // This single line applies all policy checks for the resource controller.
        $this->authorizeResource(ProjectPhysicalProgress::class, 'physical_progress');
    }

    /**
     * Display a listing of physical progress records for a specific irrigation scheme.
     */
    public function index(Request $request, IrrigationScheme $scheme)
    {
        // The policy check for 'viewAny' is now automatically handled.
        $query = $scheme->physicalProgresses()->with('media');

        if ($request->has('payment_for')) {
            $query->where('payment_for', $request->input('payment_for'));
        }

        if ($request->has('only-data')) {
            $progresses = $query->orderBy('progress_date', 'desc')->get();
            $progresses->transform(function ($progress) {
                $progress->attachments = $progress->attachments_frontend;
                return $progress;
            });

            return response()->json([
                'physicalProgresses' => $progresses,
            ]);
        }

        return redirect()->route('irrigation.schemes.index');
    }

    /**
     * Store a newly created physical progress record for an irrigation scheme.
     */
    public function store(StoreProjectPhysicalProgressRequest $request, IrrigationScheme $scheme)
    {
        // Policy check for creating is automatically handled.
        try {
            $this->irrigationService->createPhysicalProgress($scheme, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Physical Progress for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified physical progress record.
     */
    public function update(UpdateProjectPhysicalProgressRequest $request, IrrigationScheme $scheme, ProjectPhysicalProgress $physicalProgress)
    {
        // Policy check for updating is automatically handled.
        try {
            $this->irrigationService->updatePhysicalProgress($physicalProgress, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Physical Progress for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified physical progress record.
     */
    public function destroy(IrrigationScheme $scheme, ProjectPhysicalProgress $physicalProgress)
    {
        // Policy check for deleting is automatically handled.
        try {
            $physicalProgress->delete();
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }
}
