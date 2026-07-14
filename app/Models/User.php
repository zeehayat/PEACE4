<?php

namespace App\Models;

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
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Permission;

class User extends Authenticatable
{
    // The order of traits can sometimes matter.
    use HasApiTokens, HasFactory, Notifiable, HasProfilePhoto, TwoFactorAuthenticatable, HasRoles {
        HasRoles::hasPermissionTo as protected traitHasPermissionTo;
    }

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

    /**
     * Permissions explicitly denied for this user, overriding any role or
     * direct grant of the same permission.
     */
    public function deniedPermissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'user_denied_permissions');
    }

    /**
     * Overrides Spatie's HasPermissions::hasPermissionTo() (same signature,
     * confirmed at vendor/spatie/laravel-permission/src/Traits/HasPermissions.php:209).
     * An explicit denial always wins over role and direct grants.
     *
     * Note: hasPermissionTo() is defined on the HasPermissions trait (used via
     * HasRoles), not on a parent class, so `parent::hasPermissionTo()` would not
     * resolve to it — PHP's `parent::` only walks the class hierarchy, not traits
     * used by the same class. The trait's original implementation is aliased to
     * traitHasPermissionTo() in the `use HasRoles { ... }` block above so it can
     * be invoked explicitly.
     */
    public function hasPermissionTo($permission, $guardName = null): bool
    {
        $permissionName = is_string($permission) ? $permission : $permission->name;

        if ($this->deniedPermissions()->where('name', $permissionName)->exists()) {
            return false;
        }

        return $this->traitHasPermissionTo($permission, $guardName);
    }

    /**
     * This user's true effective permission set: everything their roles and
     * direct grants would give them, minus anything explicitly denied.
     */
    public function getEffectivePermissionNames(): \Illuminate\Support\Collection
    {
        $denied = $this->deniedPermissions()->pluck('name');
        return $this->getAllPermissions()->pluck('name')->diff($denied)->values();
    }
}
