<?php

namespace App\Services;

use App\Models\LrmCommittee;
use App\Models\LrmNrmAchievement;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LrmNrmAchievementService
{
    public function createAchievement(LrmCommittee $lrmCommittee, array $data): LrmNrmAchievement
    {
        Log::info('LrmNrmAchievementService: createAchievement triggered.', ['lrm_committee_id' => $lrmCommittee->id]);

        return DB::transaction(function () use ($lrmCommittee, $data) {
            return $lrmCommittee->lrmNrmAchievements()->create($data);
        });
    }

    public function updateAchievement(LrmNrmAchievement $achievement, array $data): LrmNrmAchievement
    {
        Log::info('LrmNrmAchievementService: updateAchievement triggered.', ['achievement_id' => $achievement->id]);

        return DB::transaction(function () use ($achievement, $data) {
            $achievement->update($data);
            return $achievement;
        });
    }

    public function deleteAchievement(LrmNrmAchievement $achievement): bool
    {
        Log::info('LrmNrmAchievementService: deleteAchievement triggered.', ['achievement_id' => $achievement->id]);
        return DB::transaction(fn () => $achievement->delete());
    }
}
