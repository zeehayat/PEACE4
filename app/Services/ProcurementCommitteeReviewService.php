<?php

namespace App\Services;

use App\Models\ProcurementCommitteeReview;
use Illuminate\Support\Facades\Log;

class ProcurementCommitteeReviewService
{
    public function create(array $data): ProcurementCommitteeReview
    {
        return ProcurementCommitteeReview::create($data);
    }

    public function update(ProcurementCommitteeReview $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementCommitteeReview $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementCommitteeReview
    {
        return ProcurementCommitteeReview::find($id);
    }
}
