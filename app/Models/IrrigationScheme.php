<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class IrrigationScheme extends Model
{
    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    // Accessors for progress entries (filtered manually)
    public function physicalProgressEntries()
    {
        return PhysicalProgress::where('scheme_type', 'irrigation')->where('scheme_id', $this->id)->get();
    }

    public function financialProgressEntries()
    {
        return FinancialProgress::where('scheme_type', 'irrigation')->where('scheme_id', $this->id)->get();
    }

    public function emeProgressEntries()
    {
        return EmeProgress::where('scheme_type', 'irrigation')->where('scheme_id', $this->id)->get();
    }

    public function tdProgressEntries()
    {
        return TdProgress::where('scheme_type', 'irrigation')->where('scheme_id', $this->id)->get();
    }

    public function milestoneLogs()
    {
        return MilestoneLog::where('scheme_type', 'irrigation')->where('scheme_id', $this->id)->get();
    }
}
