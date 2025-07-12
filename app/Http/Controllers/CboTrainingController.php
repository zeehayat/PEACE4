<?php

namespace App\Http\Controllers;

use App\Models\CboTraining;
use App\Http\Requests\CboTrainingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Import DB for transactions
use Illuminate\Support\Facades\Log; // Import Log for error logging
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Import Media model for direct deletion

class CboTrainingController extends Controller
{
    public function index($cboId)
    {
        return CboTraining::with('media') // Ensure media is loaded here if this index is used directly
        ->where('cbo_id', $cboId)
            ->orderByDesc('date_of_training')
            ->get();
    }

    public function store(CboTrainingRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();
                $training = CboTraining::create([
                    'cbo_id' => $data['cbo_id'],
                    'training_type' => $data['training_type'],
                    'training_gender' => $data['training_gender'],
                    'date_of_training' => $data['date_of_training'],
                    'total_participants' => $data['total_participants'],
                    'remarks' => $data['remarks'] ?? null, // NEW: Handle remarks
                ]);

                if ($request->hasFile('attachments')) {
                    $training->addMultipleMediaFromRequest(['attachments'])
                        ->each(fn($fileAdder) => $fileAdder->toMediaCollection('attachments')); // Corrected for collection name
                }
            });
            return redirect()->back()->with('success', 'CboTraining created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating CboTraining: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create CboTraining: ' . $e->getMessage());
        }
    }

    // CORRECTED: Parameter name changed from $cbotraining to $training
    public function update(CboTrainingRequest $request, CboTraining $training) // Change $cbotraining to $training
    {
        try {
            DB::transaction(function () use ($request, $training) { // Use $training
                $data = $request->validated();
                $training->update([
                    'cbo_id' => $data['cbo_id'],
                    'training_type' => $data['training_type'],
                    'training_gender' => $data['training_gender'],
                    'date_of_training' => $data['date_of_training'],
                    'total_participants' => $data['total_participants'],
                    'remarks' => $data['remarks'] ?? null, // NEW: Handle remarks
                ]);

                // Handle removed attachments
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($training)) // Use $training
                        ->where('model_id', $training->id) // Use $training
                        ->delete();
                }

                // Handle new attachments
                if ($request->hasFile('attachments')) {
                    $training->addMultipleMediaFromRequest(['attachments'])
                        ->each(fn($fileAdder) => $fileAdder->toMediaCollection('attachments'));
                }
            });
            return redirect()->back()->with('success', 'CboTraining updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating CboTraining: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update CboTraining: ' . $e->getMessage());
        }
    }

    // NEW: Show method (already provided, ensuring parameter name consistency)
    public function show(CboTraining $training) // Change $cbotraining to $training (if it was different)
    {
        // Load media attachments for the training
        $training->load('media');
        // The accessor getAttachmentsAttribute will automatically append formatted attachments.
        return response()->json($training);
    }

    // CORRECTED: Parameter name changed from $cbotraining to $training
    public function destroy(CboTraining $training) // Change $cbotraining to $training
    {
        Log::info("Attempting to delete CboTraining with ID: {$training->id}"); // Now this will show ID

        try {
            DB::transaction(function () use ($training) { // Use $training
                Log::info("Inside transaction. Deleting training ID: {$training->id}");
                $training->delete(); // Use $training
                Log::info("Training ID: {$training->id} deleted successfully within transaction.");
            });
            Log::info("Transaction committed for training ID: {$training->id}");
            return redirect()->back()->with('success', 'Training deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CboTraining: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to delete Training: ' . $e->getMessage());
        }
    }
}
