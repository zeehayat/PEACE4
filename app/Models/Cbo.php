<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Cbo extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CboFactory> */
    use HasFactory, interactsWithMedia;
    protected $fillable = [
        'reference_code', 'district', 'tehsil', 'village_council', 'village',
        'date_of_formation', 'total_members', 'gender', 'num_cbo_members',
        'president_name', 'president_contact', 'secretary_name', 'secretary_contact',
    ];

    public function dialogues()
    {
        return $this->hasMany(CboDialogue::class);
    }

    public function exposureVisits()
    {
        return $this->hasMany(CboExposureVisit::class);
    }

    public function trainings()
    {
        return $this->hasMany(CboTraining::class);
    }
}
