<?php

namespace App\Models\Views;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Model;

class IrrigationProgressLatest extends Model
{
    protected $table = 'view_irrigation_progress_latest';
    protected $primaryKey = 'irrigation_id';
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function cbo()
    {
        return $this->belongsTo(Cbo::class, 'cbo_id');
    }
}
