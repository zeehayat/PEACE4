<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MhpCompletion;
use App\Services\MhpCompletionService;
use Illuminate\Validation\Rule;

class MhpCompletionController extends Controller
{
    protected MhpCompletionService $service;

    public function __construct(MhpCompletionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = MhpCompletion::latest()->paginate(10);
        return inertia('MhpCompletions/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mhp_site_id' => [
                'required',
                'exists:mhp_sites,id',
                Rule::unique('mhp_completions', 'mhp_site_id'),
            ],
            'scheme_inauguration_date' => ['nullable', 'date'],
            'testing_commissioning_date' => ['nullable', 'date'],
            'handover_date' => ['nullable', 'date'],
            'remarks' => ['nullable', 'string'],
        ]);

        $this->service->create($validated);

        return redirect()->back()->with('success', 'MhpCompletion created.');
    }

    public function update(Request $request, MhpCompletion $mhpCompletion)
    {
        $this->service->update($mhpCompletion, $request->all());
        return redirect()->back()->with('success', 'MhpCompletion updated.');
    }

    public function destroy(MhpCompletion $mhpCompletion)
    {
        $this->service->delete($mhpCompletion);
        return redirect()->back()->with('success', 'MhpCompletion deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('MhpCompletions/Show', compact('item'));
    }
}
