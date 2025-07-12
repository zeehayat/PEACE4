<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class Cbo extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CboFactory> */
    use HasFactory, interactsWithMedia;
    protected $fillable = [
        'reference_code', 'district', 'tehsil', 'village_council', 'village',
        'date_of_formation', 'total_members', 'gender', 'num_cbo_members',
        'president_name', 'president_contact', 'secretary_name', 'secretary_contact',
    ];

    public function dialogues():HasMany
    {
        return $this->hasMany(CboDialogue::class);
    }

    public function exposureVisits():HasMany
    {
        return $this->hasMany(CboExposureVisit::class);
    }

    public function trainings():HasMany
    {
        return $this->hasMany(CboTraining::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($cbo) {
            // Delete all related dialogues, trainings, and exposure visits
            // Their own media will be deleted automatically due to HasMedia trait.
            $cbo->dialogues()->delete();
            $cbo->trainings()->delete();
            $cbo->exposureVisits()->delete();
            // If CBO has direct media, it will be deleted automatically by InteractsWithMedia
        });
    }

    // Accessor for CBO's own attachments (if used in frontend)
    protected $appends = ['cbo_attachments_frontend']; // Use a different name to avoid conflict with $cbo->attachments if that's standard for Spatie

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    public function getCboAttachmentsFrontendAttribute():array
    {
        return $this->getMedia('attachments')->map(fn ($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'file_name' => $m->file_name,
            'url' => $m->getUrl(),
            'size' => $m->size,
        ])->toArray();
    }
}
