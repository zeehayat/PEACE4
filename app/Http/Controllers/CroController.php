<?php

namespace App\Http\Controllers;

use App\Models\Cro;
use App\Http\Requests\StoreCroRequest;
use App\Http\Requests\UpdateCroRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enums\KpDistrict;

class CroController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Cro::class, 'cro');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Cro::query()->forUser(Auth::user());

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('cro_name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('district', 'like', '%' . $searchTerm . '%');
            });
        }

        $cros = $query->latest()->paginate(50)->withQueryString();

        return Inertia::render('Cro/Index', [
            'cros' => $cros,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Cro/Create', [
             'districts' => KpDistrict::toSelectArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCroRequest $request)
    {
        Cro::create($request->validated());

        return redirect()->route('cros.index')->with('success', 'CRO created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cro $cro)
    {
        return Inertia::render('Cro/Create', [
            'cro' => $cro,
            'districts' => KpDistrict::toSelectArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCroRequest $request, Cro $cro)
    {
        $cro->update($request->validated());

        return redirect()->route('cros.index')->with('success', 'CRO updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cro $cro)
    {
        $cro->delete();

        return redirect()->route('cros.index')->with('success', 'CRO deleted successfully.');
    }
}
