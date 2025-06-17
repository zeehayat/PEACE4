<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Mhp extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function cbo():BelongsTo {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments(): MorphMany {
        return $this->morphMany(Attachment::class, 'attachable');
    }
    public function revenueRecords():HasMany {
        return $this->hasMany(RevenueRecord::class);
    }
    public function operationalCosts():HasMany {
        return $this->hasMany(OperationalCost::class);
    }
    public function maintenanceCosts():HasMany {
        return $this->hasMany(MaintainenceCost::class);
    }

    // Accessors for progress entries (filtered manually)
    public function physicalProgressEntries() {
        return PhysicalProgress::where('scheme_type', 'mhp')->where('scheme_id', $this->id)->get();
    }

    public function financialProgressEntries() {
        return FinancialProgress::where('scheme_type', 'mhp')->where('scheme_id', $this->id)->get();
    }

    public function emeProgressEntries() {
        return EmeProgress::where('scheme_type', 'mhp')->where('scheme_id', $this->id)->get();
    }

    public function tdProgressEntries() {
        return TdProgress::where('scheme_type', 'mhp')->where('scheme_id', $this->id)->get();
    }

    public function milestoneLogs() {
        return MilestoneLog::where('scheme_type', 'mhp')->where('scheme_id', $this->id)->get();
    }

}
