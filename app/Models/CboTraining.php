<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CboTraining extends Model
{
    /** @use HasFactory<\Database\Factories\CboTrainingFactory> */
    use HasFactory;
    protected $fillable = ['cbo_id', 'training_type', 'training_gender', 'date_of_training', 'total_participants'];

    public function cbo()
    {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
