<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ProjectCostRevision extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectCostRevisionFactory> */
    use HasFactory;
    protected $fillable = [
        'revision_number',
        'revised_cost',
        'approved_on',
        'remarks',
    ];

    public function approvable():MorphTo
    {
        return $this->morphTo();
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
