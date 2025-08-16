<?php

namespace App\Models;

use App\Enums\KpDistrict;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens; // Use Sanctum's trait
use Spatie\Permission\Traits\HasRoles; // Ensure this is present
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    // The order of traits can sometimes matter.
    use HasApiTokens, HasFactory, Notifiable, HasProfilePhoto, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'district_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'district_id' => KpDistrict::class,
        'password' => 'hashed', // Add this for Laravel 11+
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the district that the user belongs to.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }
}
