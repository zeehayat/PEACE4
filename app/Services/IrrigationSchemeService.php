<?php

namespace App\Services;

use App\Models\IrrigationScheme;
use App\Models\ProjectFinancialInstallment; // <-- Added
use Illuminate\Support\Facades\DB; // <-- Added
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class IrrigationSchemeService
{
    public function create(array $data): IrrigationScheme
    {
        return IrrigationScheme::create($data);
    }

    public function update(IrrigationScheme $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(IrrigationScheme $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?IrrigationScheme
    {
        return IrrigationScheme::find($id);
    }

    /**
     * Get financial installments for an Irrigation Scheme.
     *
     * @param IrrigationScheme $scheme
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFinancialInstallments(IrrigationScheme $scheme)
    {
        return $scheme->financialInstallments()
            ->with('media')
            ->orderByDesc('installment_date')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * Creates a new financial installment for an irrigation scheme.
     *
     * @param IrrigationScheme $scheme
     * @param array $data
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function createFinancialInstallment(IrrigationScheme $scheme, array $data): ProjectFinancialInstallment
    {
        return DB::transaction(function () use ($scheme, $data) {
            $attachments = $data['attachments'] ?? [];
            unset($data['attachments']);
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            $installment = $scheme->financialInstallments()->create($data);

            if (!empty($attachments)) {
                $this->handleAttachments($installment, $attachments);
            }

            return $installment;
        });
    }

    /**
     * Updates an existing financial installment.
     *
     * @param ProjectFinancialInstallment $installment
     * @param array $data
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function updateFinancialInstallment(ProjectFinancialInstallment $installment, array $data): ProjectFinancialInstallment
    {
        return DB::transaction(function () use ($installment, $data) {
            $attachmentsToDelete = $data['attachments_to_delete'] ?? [];
            $attachments = $data['attachments'] ?? [];
            unset($data['attachments_to_delete']);
            unset($data['attachments']);
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            $installment->update($data);

            if (!empty($attachmentsToDelete)) {
                foreach ($attachmentsToDelete as $mediaId) {
                    $installment->deleteMedia($mediaId);
                }
            }
            if (!empty($attachments)) {
                $this->handleAttachments($installment, $attachments);
            }

            return $installment;
        });
    }

    /**
     * Handle the storage of attachments for a given model.
     *
     * @param mixed $model
     * @param array $attachments
     * @return void
     */
    protected function handleAttachments(mixed $model, array $attachments): void
    {
        foreach ($attachments as $attachment) {
            if ($attachment instanceof \Illuminate\Http\UploadedFile) {
                $model->addMedia($attachment)
                    ->usingFileName(Str::random(10) . '.' . $attachment->getClientOriginalExtension())
                    ->toMediaCollection('attachments');
            }
        }
    }
}
