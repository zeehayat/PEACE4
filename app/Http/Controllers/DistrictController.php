<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(District::class, 'district');
    }

    public function index()
    {
        return Inertia::render('Admin/Districts/Index', [
            'districts' => District::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:districts,name'],
        ]);

        District::create($validated);

        return redirect()->route('admin.districts.index')->with('success', 'District added successfully!');
    }
}
