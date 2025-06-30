<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CboTraining extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CboTrainingFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = ['cbo_id', 'training_type', 'training_gender', 'date_of_training', 'total_participants'];

    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }


}
