<?php
namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Cbo;
use App\Services\CboService;
use Inertia\Inertia;

class CboController extends Controller
{
    protected CboService $service;

    public function __construct(CboService $service)
    {
        $this->service = $service;
    }
    // In CboController.php
    public function autoSearch(Request $request)
    {
        $query = $request->input('search');
        $cbos = Cbo::where('reference_code', 'like', "%{$query}%")
            ->orWhere('district', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'reference_code']); // Ensure these fields are returned
        return response()->json($cbos);
    }
    public function details($id)
    {
        $cbo = Cbo::findOrFail($id);

        // Eager load all related models AND their media relationships
        // This avoids N+1 queries for media when the accessors are called.
        $cbo->load([
            'media', // CBO's direct media
            'dialogues.media',
            'trainings.media',
            'exposureVisits.media',
        ]);

        // Transform CBO's own media (if any)
        $cbo->cbo_attachments = $cbo->getMedia('attachments')->map(fn ($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'file_name' => $m->file_name,
            'url' => $m->getUrl(),
            'size' => $m->size,
        ]);

        // No need for explicit $cbo->dialogues->transform() etc. here.
        // The `getAttachmentsAttribute()` accessor on each Dialogue/Training/ExposureVisit model
        // will automatically format the already eager-loaded `media` relationship when they are serialized to JSON.

        return response()->json($cbo);
    }
    public function index(Request $request)
    {
        $query = Cbo::query();

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->filled('district')) {
            $query->where('district', 'like', '%' . $request->district . '%');
        }

        if ($request->filled('date_of_formation')) {
            $query->whereDate('date_of_formation', $request->date_of_formation);
        }

        return inertia('Cbo/List', [
            'cbos' => $query->get(),
            'filters' => $request->only('gender', 'district', 'date_of_formation'),
        ]);
    }
    public function create()
    {

        return Inertia::render('Cbo/Create',[

        ]);

    }
    public function store(Request $request)
    {
        try{
            $cbo = $this->service->create($request->all());
            $cbo=Cbo::all();

            return Inertia::render('Cbo/List',[
                'cbos'=>$cbo,
            ]);
        }
        catch (QueryException $e){
            if ($e->getCode() === '23000') {
                // Duplicate key error
                return back()
                    ->withErrors(['reference_code' => 'A CBO with this reference code already exists.'])
                    ->withInput();
            }

            return back()
                ->withErrors(['error' => 'An unexpected error occurred.'])
                ->withInput();
        }


    }
    public function edit(Cbo $cbo)
    {
        return inertia('Cbo/Edit', [
            'cbo' => $cbo
        ]);
    }

    public function update(Request $request, Cbo $cbo)
    {
        $this->service->update($cbo, $request->all());
        return redirect()->back()->with('success', 'Cbo updated.');
    }

    public function destroy(Cbo $cbo)
    {
        $this->service->delete($cbo);
        return redirect()->back()->with('success', 'Cbo deleted.');
    }

    public function show(Cbo $cbo)
    {


        return inertia('Cbo/Show', [
            'item' => $cbo->load('media'), // if you want media; optional
        ]);
    }
}
