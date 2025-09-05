<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class OperationalCost extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    public $table = 'operational_costs';
    protected $fillable = [
        'mhp_site_id',
        'cost_date',
        'expense_type_id',
        'amount',
        'remarks'
    ];

    protected $casts = [
        'cost_date' => 'date',
        'amount' => 'decimal:2',
    ];

    protected $appends = ['attachments_frontend'];


    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    public function expenseType(): BelongsTo
    {
        return $this->belongsTo(ExpenseType::class);
    }

    /**
     * Register the media collections for the model.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('default');
    }

    public function getAttachmentsFrontendAttribute()
    {
        return $this->getMedia('default')->map(fn (SpatieMedia $media) => [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->toArray();
    }
    public function getMorphClass()
    {
        return 'operational_cost';
    }
}
