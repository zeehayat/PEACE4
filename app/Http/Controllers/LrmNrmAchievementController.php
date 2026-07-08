<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLrmNrmAchievementRequest;
use App\Http\Requests\UpdateLrmNrmAchievementRequest;
use App\Models\LrmCommittee;
use App\Models\LrmNrmAchievement;
use App\Services\LrmNrmAchievementService;

class LrmNrmAchievementController extends Controller
{
    protected LrmNrmAchievementService $service;

    public function __construct(LrmNrmAchievementService $service)
    {
        $this->service = $service;
        $this->authorizeResource(LrmNrmAchievement::class, 'achievement');
    }

    public function index(LrmCommittee $lrmCommittee)
    {
        return response()->json(
            $lrmCommittee->lrmNrmAchievements()->orderByDesc('date')->get()
        );
    }

    public function store(StoreLrmNrmAchievementRequest $request, LrmCommittee $lrmCommittee)
    {
        $this->service->createAchievement($lrmCommittee, $request->validated());
        return redirect()->back()->with('success', 'NRM achievement recorded successfully!');
    }

    public function update(UpdateLrmNrmAchievementRequest $request, LrmCommittee $lrmCommittee, LrmNrmAchievement $achievement)
    {
        $this->service->updateAchievement($achievement, $request->validated());
        return redirect()->back()->with('success', 'NRM achievement updated successfully!');
    }

    public function destroy(LrmCommittee $lrmCommittee, LrmNrmAchievement $achievement)
    {
        $this->service->deleteAchievement($achievement);
        return redirect()->back()->with('success', 'NRM achievement deleted successfully!');
    }
}
