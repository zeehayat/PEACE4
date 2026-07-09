<?php

namespace App\Services;

use App\Models\LrmCommittee;
use App\Models\LrmCro;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LrmCroService
{
    public function createCro(LrmCommittee $lrmCommittee, array $data): LrmCro
    {
        Log::info('LrmCroService: createCro triggered.', ['lrm_committee_id' => $lrmCommittee->id]);

        return DB::transaction(function () use ($lrmCommittee, $data) {
            return $lrmCommittee->lrmCros()->create($data);
        });
    }

    public function updateCro(LrmCro $cro, array $data): LrmCro
    {
        Log::info('LrmCroService: updateCro triggered.', ['cro_id' => $cro->id]);

        return DB::transaction(function () use ($cro, $data) {
            $cro->update($data);
            return $cro;
        });
    }

    public function deleteCro(LrmCro $cro): bool
    {
        Log::info('LrmCroService: deleteCro triggered.', ['cro_id' => $cro->id]);
        return DB::transaction(fn () => $cro->delete());
    }
}
