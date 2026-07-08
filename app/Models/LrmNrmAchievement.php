<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LrmNrmAchievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'lrm_committee_id',
        'date',
        'achieved_forest_area_value',
        'achieved_forest_area_unit',
        'achieved_fruit_area_value',
        'achieved_fruit_area_unit',
        'achieved_forest_plants_count',
        'achieved_fruit_plants_count',
        'achieved_drr_training_persons',
        'achieved_check_dams_value',
        'achieved_check_dams_unit',
        'achieved_greenbelt_lawn_value',
        'achieved_greenbelt_lawn_unit',
        'achieved_composting_training_persons',
        'achieved_pest_control_training_persons',
        'achieved_pest_control_kits',
        'remarks',
    ];

    protected $attributes = [
        'achieved_forest_area_unit' => 'Kanal',
        'achieved_fruit_area_unit' => 'Kanal',
        'achieved_check_dams_unit' => 'CFT',
        'achieved_greenbelt_lawn_unit' => 'Sft',
    ];

    protected $casts = [
        'date' => 'date',
        'achieved_forest_area_value' => 'decimal:2',
        'achieved_fruit_area_value' => 'decimal:2',
        'achieved_forest_plants_count' => 'integer',
        'achieved_fruit_plants_count' => 'integer',
        'achieved_drr_training_persons' => 'integer',
        'achieved_check_dams_value' => 'decimal:2',
        'achieved_greenbelt_lawn_value' => 'decimal:2',
        'achieved_composting_training_persons' => 'integer',
        'achieved_pest_control_training_persons' => 'integer',
        'achieved_pest_control_kits' => 'integer',
    ];

    public function lrmCommittee(): BelongsTo
    {
        return $this->belongsTo(LrmCommittee::class);
    }
}
