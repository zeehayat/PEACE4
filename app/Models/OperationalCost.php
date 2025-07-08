<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class OperationalCost extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\OperationalCostFactory> */
    use HasFactory, InteractsWithMedia;

    public $table = 'operational_costs';
    protected $fillable = [
        'mhp_site_id',
        'cost_date',
        'expense_type_id',
        'amount',
        'remarks'
    ];

    public function mhpSite():BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }
    public function expenseType(): BelongsTo {
        return $this->belongsTo(ExpenseType::class);
    }

}
