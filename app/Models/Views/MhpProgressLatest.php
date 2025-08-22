<?php

namespace App\Models\Views;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Model;

class MhpProgressLatest extends Model
{
    protected $table = 'view_mhp_progress_latest';
    protected $primaryKey = 'mhp_id';
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function cbo()
    {
        return $this->belongsTo(Cbo::class, 'cbo_id');
    }
}
