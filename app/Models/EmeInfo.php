<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmeInfo extends Model
{
    use HasFactory;

    // Set the table name explicitly if it doesn't follow Laravel's convention
    protected $table = 'eme_info';

    protected $fillable = [
        'mhp_site_id',
        'turbine_capacity_kw',
        'turbine_type',
        'turbine_no',
        'governor_type',
        'governor_no',
        'generator_alternator_capacity',
        'stepup_transformer_capacity',
        'no_of_step_up_transformers',
        'scada_system',
        'scada_system_model',
        'station_generator_capacity',
        'penstock_pipe',
        'no_of_penstock_pipe',
    ];
    protected $casts = [
        'scada_system' => 'boolean',
    ];
    /**
     * Get the MHP site that this EME profile belongs to.
     */
    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }
}
