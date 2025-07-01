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

    public function index()
    {
        $cbos = Cbo::all();
        return inertia('Cbo/List', [
            'cbos' => $cbos,
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
