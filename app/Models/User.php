<?php

namespace App\Models;

use App\Enums\KpDistrict;
use App\Models\District;
use App\Models\DistrictPermission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens; // Use Sanctum's trait
use Spatie\Permission\Traits\HasRoles; // Ensure this is present
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function districtPermissions(): HasMany
    {
        return $this->hasMany(DistrictPermission::class);
    }

    /**
     * Check CRUD ability for a specific district.
     */
    public function hasDistrictAbility(int $districtId, string $ability): bool
    {
        if ($this->hasAnyRole(['Root', 'Admin', 'PSU'])) {
            return true;
        }

        // PSU district users inherit all districts
        if (strtolower($this->district?->name ?? '') === 'psu') {
            return true;
        }

        $perm = $this->districtPermissions->firstWhere('district_id', $districtId);
        if (!$perm) {
            return false;
        }

        return match ($ability) {
            'read' => (bool) $perm->can_read,
            'create' => (bool) $perm->can_create,
            'update' => (bool) $perm->can_update,
            'delete' => (bool) $perm->can_delete,
            default => false,
        };
    }
}
