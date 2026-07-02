<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectVisitRequest;
use App\Http\Requests\UpdateProjectVisitRequest;
use App\Models\ProjectVisit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProjectVisitController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(ProjectVisit::class, 'visit', [
            'except' => ['index', 'store'],
        ]);
    }

    /**
     * Helper to resolve the parent model dynamically.
     */
    protected function resolveVisitable(Request $request)
    {
        $route = $request->route();
        
        if ($route->hasParameter('scheme')) {
            return $route->parameter('scheme');
        }
        if ($route->hasParameter('site')) {
            return $route->parameter('site');
        }
        
        abort(400, 'Visitable parent model not resolved.');
    }

    public function index(Request $request)
    {
        $visitable = $this->resolveVisitable($request);
        $this->authorize('viewAny', [ProjectVisit::class, $visitable]);

        $visits = $visitable->visits()->with('media')->orderBy('visit_date', 'desc')->get();

        return response()->json([
            'visits' => $visits->map(function ($visit) {
                $visit->attachments = $visit->attachments_frontend;
                return $visit;
            }),
        ]);
    }

    public function store(StoreProjectVisitRequest $request)
    {
        $visitable = $this->resolveVisitable($request);
        $this->authorize('create', [ProjectVisit::class, $visitable]);

        try {
            DB::transaction(function () use ($request, $visitable) {
                $data = $request->validated();
                $attachments = $data['attachments'] ?? [];
                unset($data['attachments']);

                $visit = $visitable->visits()->create($data);

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        $visit->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->back()->with('success', 'Visit recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Visit: ' . $e->getMessage());
        }
    }

    public function update(UpdateProjectVisitRequest $request, $parentId, ProjectVisit $visit)
    {
        $this->authorize('update', $visit);

        try {
            DB::transaction(function () use ($request, $visit) {
                $data = $request->validated();
                $attachmentsToDelete = $data['attachments_to_delete'] ?? [];
                $attachments = $data['attachments'] ?? [];
                unset($data['attachments_to_delete'], $data['attachments']);

                $visit->update($data);

                if (!empty($attachmentsToDelete)) {
                    foreach ($attachmentsToDelete as $mediaId) {
                        $visit->deleteMedia($mediaId);
                    }
                }

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        $visit->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->back()->with('success', 'Visit updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Visit: ' . $e->getMessage());
        }
    }

    public function destroy($parentId, ProjectVisit $visit)
    {
        $this->authorize('delete', $visit);

        try {
            $visit->delete();
            return redirect()->back()->with('success', 'Visit deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Visit: ' . $e->getMessage());
        }
    }
}
