<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum KpDistrict: int
{
    case DIR_UPPER = 1;
    case DIR_LOWER = 2;
    case CHITRAL_LOWER = 3;
    case CHITRAL_UPPER = 4;
    case CHITRAL = 5;
    case NORTH_WAZIRISTAN = 6;
    case SOUTH_WAZIRISTAN = 7;
    case KURRAM = 8;
    case SWAT = 9;

    /**
     * Get the human-readable label for the district.
     * Example: 'NORTH_WAZIRISTAN' becomes 'North Waziristan'.
     */
    public function getLabel(): string
    {
        return Str::of($this->name)->replace('_', ' ')->title();
    }

    /**
     * Get all districts formatted as an array for a select dropdown.
     */
    
    public static function toSelectArray(): array
    {
        return array_map(
            fn($case) => ['id' => $case->value, 'name' => $case->getLabel()],
            self::cases()
        );
    }
}
