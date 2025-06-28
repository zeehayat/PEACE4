<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Http\Requests\CboDialogueRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class CboDialogueController extends Controller
{

    public function index(Request $request)
    {
        $query = CboDialogue::with('cbo', 'media')->latest();

        if ($request->has('district')) {
            $query->whereHas('cbo', fn ($q) => $q->where('district', $request->district));
        }

        if ($request->has('date')) {
            $query->whereDate('date_of_dialogue', $request->date);
        }

        $dialogues = $query->paginate(10);

        return Inertia::render('CboDialogue/Index', [
            'dialogues' => $dialogues,
            'filters' => $request->only('district', 'date'),
        ]);
    }


    public function create()
    {
        $cbos = Cbo::select('id', 'reference_code')->get();

        return Inertia::render('CboDialogue/Create', [
            'cbos' => $cbos,
        ]);
    }

    public function store(CboDialogueRequest $request)
    {

        $data = $request->validated();

        $dialogue = CboDialogue::create([
            'cbo_id' => $data['cbo_id'],
            'date_of_dialogue' => $data['date_of_dialogue'],
            'participants' => $data['participants'],
        ]);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $dialogue->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return redirect()->route('cbo.dialogues.index')->with('success', 'Dialogue created.');

    }
    public function edit(CboDialogue $dialogue)
    {
        $dialogue->load('cbo', 'media');

        return Inertia::render('CboDialogue/Edit', [
            'dialogue' => $dialogue,
            'cbos' => Cbo::all(['id', 'reference_code']),
        ]);
    }


    /**
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function update(CboDialogueRequest $request, CboDialogue $dialogue)
    {
        $data = $request->validated();

        $dialogue->update([
            'cbo_id' => $data['cbo_id'],
            'date_of_dialogue' => $data['date_of_dialogue'],
            'participants' => $data['participants'],
        ]);
        if ($request->filled('removed_attachments')) {
            foreach ($request->removed_attachments as $id) {
                $dialogue->getMedia('attachments')->where('id', $id)->first()?->delete();
            }
        }
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $dialogue->addMedia($file)->toMediaCollection('attachments', 'public');
            }
        }

        return redirect()->route('cbo.dialogues.index')->with('success', 'Dialogue updated.');
    }


}
