<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User; // Added for the scopeForUser method

class Cro extends Model
{
    use HasFactory;

    protected $fillable = [
        'district',
        'tehsil',
        'village_council',
        'village',
        'date_final_community_dialogue',
        'no_of_community_dialogues',
        'dialogue_participants',
        'cro_name',
        'date_of_cro_formation',
        'total_members',
        'gender', // 'Male', 'Female', 'Mixed'
        'no_of_cro_members',
        'president_name',
        'president_contact',
        'secretary_name',
        'secretary_contact',
        'date_exposure_visit',
        'exposure_visit_participants',
        'date_om_training',
        'om_training_participants',
        'date_electrical_training',
        'electrical_training_participants',
        'remarks',
    ];

    protected $casts = [
        'date_final_community_dialogue' => 'date',
        'date_of_cro_formation' => 'date',
        'date_exposure_visit' => 'date',
        'date_om_training' => 'date',
        'date_electrical_training' => 'date',
    ];

    /**
     * Scope a query to only include CROs appropriate for the given user.
     */
    public function scopeForUser(Builder $query, User $user): void
    {
        // If the user is a district-level user, only show CROs from their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->where('district', $user->district->name);
        }
    }
}
