<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
// Removed Spatie\MediaLibrary traits/interfaces if they were there and not needed, based on your provided file.
// If you want OperationalCost to have attachments, add HasMedia and InteractsWithMedia and their methods.

class OperationalCost extends Model
{
    use HasFactory;

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


    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    public function expenseType(): BelongsTo
    {
        return $this->belongsTo(ExpenseType::class);
    }
}
