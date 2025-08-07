
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementCommitteeReview;
use App\Services\ProcurementCommitteeReviewService;

class ProcurementCommitteeReviewController extends Controller
{
    protected ProcurementCommitteeReviewService $service;

    public function __construct(ProcurementCommitteeReviewService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementCommitteeReview::latest()->paginate(10);
        return inertia('ProcurementCommitteeReviews/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementCommitteeReview created.');
    }

    public function update(Request $request, ProcurementCommitteeReview $procurementCommitteeReview)
    {
        $this->service->update($procurementCommitteeReview, $request->all());
        return redirect()->back()->with('success', 'ProcurementCommitteeReview updated.');
    }

    public function destroy(ProcurementCommitteeReview $procurementCommitteeReview)
    {
        $this->service->delete($procurementCommitteeReview);
        return redirect()->back()->with('success', 'ProcurementCommitteeReview deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementCommitteeReviews/Show', compact('item'));
    }
}
