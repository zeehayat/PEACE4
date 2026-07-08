<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LrmCro extends Model
{
    use HasFactory;

    protected $fillable = [
        'lrm_committee_id',
        'name',
        'village',
        'type',
        'male_members',
        'female_members',
        'total_members',
        'president_name',
        'president_contact',
        'secretary_name',
        'secretary_contact',
        'remarks',
    ];

    protected $casts = [
        'male_members' => 'integer',
        'female_members' => 'integer',
        'total_members' => 'integer',
    ];

    public function lrmCommittee(): BelongsTo
    {
        return $this->belongsTo(LrmCommittee::class);
    }
}
