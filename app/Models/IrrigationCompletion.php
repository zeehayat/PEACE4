<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrrigationCompletion extends Model
{
    /** @use HasFactory<\Database\Factories\IrrigationCompletionFactory> */
    use HasFactory;
    protected $fillable = [
        'irrigation_scheme_id',
        'handover_date',
        'remarks',
    ];

    public function scheme()
    {
        return $this->belongsTo(IrrigationScheme::class, 'irrigation_scheme_id');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
