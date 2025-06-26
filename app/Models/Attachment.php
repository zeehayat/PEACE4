<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    /** @use HasFactory<\Database\Factories\AttachmentFactory> */
    use HasFactory;
    protected $fillable = ['attachable_id', 'attachable_type', 'path', 'description', 'uploaded_at'];

    public function attachable()
    {
        return $this->morphTo();
    }
}
