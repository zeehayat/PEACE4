<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Http\Requests\CboDialogueRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Illuminate\Support\Facades\DB; // Import DB for transactions
use Illuminate\Support\Facades\Log; // Import Log for error logging
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Import Media model for direct deletion

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
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();
                $dialogue = CboDialogue::create([
                    'cbo_id' => $data['cbo_id'],
                    'date_of_dialogue' => $data['date_of_dialogue'],
                    'participants' => $data['participants'],
                    'remarks' => $data['remarks'] ?? null, // Added remarks from CboDialogueForm
                ]);

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $dialogue->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->route('cbo.dialogues.index')->with('success', 'Dialogue created.');
        } catch (FileDoesNotExist | FileIsTooBig $e) {
            Log::error('File upload error for Dialogue: ' . $e->getMessage());
            return redirect()->back()->with('error', 'File upload failed: ' . $e->getMessage());
        } catch (\Exception $e) {
            Log::error('Error creating Dialogue: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Dialogue: ' . $e->getMessage());
        }
    }

    public function edit(CboDialogue $dialogue)
    {
        $dialogue->load('cbo', 'media'); // Make sure 'media' is loaded for attachments

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
        try {
            DB::transaction(function () use ($request, $dialogue) {
                $data = $request->validated();
                $dialogue->update([
                    'cbo_id' => $data['cbo_id'],
                    'date_of_dialogue' => $data['date_of_dialogue'],
                    'participants' => $data['participants'],
                    'remarks' => $data['remarks'] ?? null, // Added remarks
                ]);

                // Handle removed attachments
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($dialogue))
                        ->where('model_id', $dialogue->id)
                        ->delete();
                }

                // Handle new attachments
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $dialogue->addMedia($file)->toMediaCollection('attachments'); // Use default disk or specify 'public'
                    }
                }
            });

            return redirect()->route('cbo.dialogues.index')->with('success', 'Dialogue updated.');
        } catch (FileDoesNotExist | FileIsTooBig $e) {
            Log::error('File upload error for Dialogue update: ' . $e->getMessage());
            return redirect()->back()->with('error', 'File upload failed: ' . $e->getMessage());
        } catch (\Exception $e) {
            Log::error('Error updating Dialogue: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Dialogue: ' . $e->getMessage());
        }
    }

    // NEW: Destroy Method for CboDialogue
    public function destroy(CboDialogue $dialogue)
    {
        try {
            DB::transaction(function () use ($dialogue) {
                // Spatie Media Library models automatically delete associated media
                // when the parent model is deleted. No explicit media deletion needed here.
                $dialogue->delete();
            });
            return redirect()->back()->with('success', 'Dialogue deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting Dialogue: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Dialogue: ' . $e->getMessage());
        }
    }
}
