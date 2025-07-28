<?php

namespace App\Services;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Models\CboExposureVisit;
use App\Models\CboTraining;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Throwable;

class CboService
{
    // --- CBO Operations ---

    /**
     * Create a new CBO record.
     *
     * @param array $data Data for CBO creation.
     * @return Cbo
     * @throws Throwable
     */
    public function createCbo(array $data): Cbo
    {

        Log::info('CboService: createCbo triggered.', ['data_keys' => array_keys($data)]);
        Log::info('Attachments count in createCbo data:', ['count' => count($data['attachments'] ?? [])]);
        return DB::transaction(function () use ($data) {
            $cbo = Cbo::create($data);
            Log::info('CBO model created in DB:', ['cbo_id' => $cbo->id]);

            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            Log::info('Attempting to add media for CBO:', ['cbo_id' => $cbo->id, 'file_name' => $attachment->getClientOriginalName(), 'index' => $index]);

                            $cbo->addMedia($attachment)->toMediaCollection('attachments');


                            Log::info('CBO media added.', ['cbo_id' => $cbo->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('ERROR: Failed to add media for CBO.', [
                                'cbo_id' => $cbo->id,
                                'file_name' => $attachment->getClientOriginalName() ?? 'N/A',
                                'error' => $e->getMessage(),
                                'trace' => $e->getTraceAsString(),
                            ]);
                            throw $e;
                        }
                    }
                }
            }
            return $cbo;
        });
    }

    /**
     * Update an existing CBO record.
     *
     * @param Cbo $cbo The Cbo instance to update.
     * @param array $data Data for CBO update.
     * @return Cbo
     * @throws Throwable
     */
    public function updateCbo(Cbo $cbo, array $data): Cbo
    {
        Log::info('CboService: updateCbo triggered.', ['cbo_id' => $cbo->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($cbo, $data) {
            $cbo->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $cbo->deleteMedia($mediaId);
                    Log::info('CBO media deleted.', ['cbo_id' => $cbo->id, 'media_id' => $mediaId]);
                }
            }
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $cbo->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('CBO media added during update.', ['cbo_id' => $cbo->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for CBO during update.', ['cbo_id' => $cbo->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $cbo;
        });
    }

    /**
     * Delete a CBO record.
     *
     * @param Cbo $cbo The Cbo instance to delete.
     * @return bool
     * @throws Throwable
     */
    public function deleteCbo(Cbo $cbo): bool
    {
        Log::info('CboService: deleteCbo triggered.', ['cbo_id' => $cbo->id]);
        return DB::transaction(function () use ($cbo) {
            // The boot method on Cbo model handles cascading deletes for related models
            // and their media via Spatie Media Library.
            return $cbo->delete();
        });
    }

    // --- CBO Dialogue Operations ---

    /**
     * Create a new CBO Dialogue record.
     *
     * @param Cbo $cbo The parent Cbo instance.
     * @param array $data Data for CboDialogue creation.
     * @return CboDialogue
     * @throws Throwable
     */
    public function createCboDialogue(Cbo $cbo, array $data): CboDialogue
    {
        Log::info('CboService: createCboDialogue triggered.', ['cbo_id' => $cbo->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($cbo, $data) {
            $dialogue = $cbo->dialogues()->create($data); // Automatically sets cbo_id
            Log::info('CboService: CboDialogue created in DB.', ['dialogue_id' => $dialogue->id, 'cbo_id_saved' => $dialogue->cbo_id]);

            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $dialogue->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Dialogue media added.', ['dialogue_id' => $dialogue->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Dialogue.', ['dialogue_id' => $dialogue->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $dialogue;
        });
    }

    /**
     * Update an existing CBO Dialogue record.
     *
     * @param CboDialogue $dialogue The CboDialogue instance to update.
     * @param array $data Data for CboDialogue update.
     * @return CboDialogue
     * @throws Throwable
     */
    public function updateCboDialogue(CboDialogue $dialogue, array $data): CboDialogue
    {
        Log::info('CboService: updateCboDialogue triggered.', ['dialogue_id' => $dialogue->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($dialogue, $data) {
            $dialogue->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $dialogue->deleteMedia($mediaId);
                    Log::info('Dialogue media deleted.', ['dialogue_id' => $dialogue->id, 'media_id' => $mediaId]);
                }
            }
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $dialogue->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Dialogue media added during update.', ['dialogue_id' => $dialogue->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Dialogue during update.', ['dialogue_id' => $dialogue->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $dialogue;
        });
    }

    /**
     * Delete a CBO Dialogue record.
     *
     * @param CboDialogue $dialogue The CboDialogue instance to delete.
     * @return bool
     * @throws Throwable
     */
    public function deleteCboDialogue(CboDialogue $dialogue): bool
    {
        Log::info('CboService: deleteCboDialogue triggered.', ['dialogue_id' => $dialogue->id]);
        return DB::transaction(function () use ($dialogue) {
            return $dialogue->delete(); // Spatie Media Library will delete associated files
        });
    }

    // --- CBO Exposure Visit Operations ---

    /**
     * Create a new CBO Exposure Visit record.
     *
     * @param Cbo $cbo The parent Cbo instance.
     * @param array $data Data for CboExposureVisit creation.
     * @return CboExposureVisit
     * @throws Throwable
     */
    public function createCboExposureVisit(Cbo $cbo, array $data): CboExposureVisit
    {
        Log::info('CboService: createCboExposureVisit triggered.', ['cbo_id' => $cbo->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($cbo, $data) {
            $visit = $cbo->exposureVisits()->create($data); // Automatically sets cbo_id

            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $visit->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Exposure Visit media added.', ['visit_id' => $visit->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Exposure Visit.', ['visit_id' => $visit->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $visit;
        });
    }

    /**
     * Update an existing CBO Exposure Visit record.
     *
     * @param CboExposureVisit $visit The CboExposureVisit instance to update.
     * @param array $data Data for CboExposureVisit update.
     * @return CboExposureVisit
     * @throws Throwable
     */
    public function updateCboExposureVisit(CboExposureVisit $visit, array $data): CboExposureVisit
    {
        Log::info('CboService: updateCboExposureVisit triggered.', ['visit_id' => $visit->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($visit, $data) {
            $visit->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $visit->deleteMedia($mediaId);
                    Log::info('Exposure Visit media deleted.', ['visit_id' => $visit->id, 'media_id' => $mediaId]);
                }
            }
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $visit->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Exposure Visit media added during update.', ['visit_id' => $visit->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Exposure Visit during update.', ['visit_id' => $visit->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $visit;
        });
    }

    /**
     * Delete a CBO Exposure Visit record.
     *
     * @param CboExposureVisit $visit The CboExposureVisit instance to delete.
     * @return bool
     * @throws Throwable
     */
    public function deleteCboExposureVisit(CboExposureVisit $visit): bool
    {
        Log::info('CboService: deleteCboExposureVisit triggered.', ['visit_id' => $visit->id]);
        return DB::transaction(function () use ($visit) {
            return $visit->delete(); // Spatie Media Library will delete associated files
        });
    }

    // --- CBO Training Operations ---

    /**
     * Create a new CBO Training record.
     *
     * @param Cbo $cbo The parent Cbo instance.
     * @param array $data Data for CboTraining creation.
     * @return CboTraining
     * @throws Throwable
     */
    public function createCboTraining(Cbo $cbo, array $data): CboTraining
    {
        Log::info('CboService: createCboTraining triggered.', ['cbo_id' => $cbo->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($cbo, $data) {
            $training = $cbo->trainings()->create($data); // Automatically sets cbo_id

            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $training->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Training media added.', ['training_id' => $training->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Training.', ['training_id' => $training->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $training;
        });
    }

    /**
     * Update an existing CBO Training record.
     *
     * @param CboTraining $training The CboTraining instance to update.
     * @param array $data Data for CboTraining update.
     * @return CboTraining
     * @throws Throwable
     */
    public function updateCboTraining(CboTraining $training, array $data): CboTraining
    {
        Log::info('CboService: updateCboTraining triggered.', ['training_id' => $training->id, 'data_keys' => array_keys($data)]);
        return DB::transaction(function () use ($training, $data) {
            $training->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $training->deleteMedia($mediaId);
                    Log::info('Training media deleted.', ['training_id' => $training->id, 'media_id' => $mediaId]);
                }
            }
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof UploadedFile) {
                        try {
                            $training->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Training media added during update.', ['training_id' => $training->id, 'file' => $attachment->getClientOriginalName()]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for Training during update.', ['training_id' => $training->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                            throw $e;
                        }
                    }
                }
            }
            return $training;
        });
    }

    /**
     * Delete a CBO Training record.
     *
     * @param CboTraining $training The CboTraining instance to delete.
     * @return bool
     * @throws Throwable
     */
    public function deleteCboTraining(CboTraining $training): bool
    {
        Log::info('CboService: deleteCboTraining triggered.', ['training_id' => $training->id]);
        return DB::transaction(function () use ($training) {
            return $training->delete(); // Spatie Media Library will delete associated files
        });
    }
}
