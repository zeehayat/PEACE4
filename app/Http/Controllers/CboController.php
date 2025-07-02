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
    public function details($id)
    {
        $cbo = Cbo::findOrFail($id);

        return response()->json([
            'dialogues' => $cbo->dialogues,
            'trainings' => $cbo->trainings,
            'exposures' => $cbo->exposureVisits,
        ]);
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
