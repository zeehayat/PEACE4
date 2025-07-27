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
    use HasFactory, InteractsWithMedia;

    protected $table = 'cbos';

    protected $fillable = [
        'reference_code',
        'district',
        'tehsil',
        'village_council',
        'village',
        'date_of_formation',
        'total_members',
        'gender',
        'num_cbo_members',
        'president_name',
        'president_contact',
        'secretary_name',
        'secretary_contact',
        'remarks', // Added remarks field
    ];

    protected $casts = [
        'date_of_formation' => 'date',
        'total_members' => 'integer',
        'num_cbo_members' => 'integer',
        'gender' => 'string', // Cast enum to string
    ];

    /**
     * The "booting" method of the model.
     * Ensures related media is deleted when CBO is deleted.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($cbo) {
            // While database foreign keys handle record deletion (ON DELETE CASCADE),
            // calling delete() on related models here ensures their own 'deleting' model events fire.
            // This is crucial for Spatie Media Library to delete associated media files from storage.
            // We use each(fn($child) => $child->delete()) to trigger model events for each child.
            $cbo->dialogues->each(fn ($dialogue) => $dialogue->delete());
            $cbo->trainings->each(fn ($training) => $training->delete());
            $cbo->exposureVisits->each(fn ($visit) => $visit->delete());

            // If CBO has direct media, it will be deleted automatically by InteractsWithMedia
        });
    }

    // --- Relationships ---
    public function dialogues(): HasMany
    {
        return $this->hasMany(CboDialogue::class);
    }

    public function exposureVisits(): HasMany
    {
        return $this->hasMany(CboExposureVisit::class);
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(CboTraining::class);
    }

    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments'); // Main attachments for the CBO
    }

    // Accessor for formatted attachments for frontend
    protected $appends = ['attachments_frontend']; // Append formatted attachments

    public function getAttachmentsFrontendAttribute(): array
    {
        return $this->getMedia('attachments')->map(fn (SpatieMedia $media) => [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->toArray();
    }
}
