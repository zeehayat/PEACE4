<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum KpDistrict: int
{
    case ABBOTTABAD = 1;
    case BAJAUR = 2;
    case BANNU = 3;
    case BATTAGRAM = 4;
    case BUNER = 5;
    case CHARSADDA = 6;
    case DERA_ISMAIL_KHAN = 7;
    case HANGU = 8;
    case HARIPUR = 9;
    case KARAK = 10;
    case KHYBER = 11;
    case KOHAT = 12;
    case KOLAI_PALLAS = 13;
    case KURRAM = 14;
    case LAKKI_MARWAT = 15;
    case LOWER_CHITRAL = 16;
    case LOWER_DIR = 17;
    case LOWER_KOHISTAN = 18;
    case MALAKAND = 19;
    case MANSEHRA = 20;
    case MARDAN = 21;
    case MOHMAND = 22;
    case NORTH_WAZIRISTAN = 23;
    case NOWSHERA = 24;
    case ORAKZAI = 25;
    case PESHAWAR = 26;
    case SHANGLA = 27;
    case SOUTH_WAZIRISTAN = 28;
    case SWABI = 29;
    case SWAT = 30;
    case TANK = 31;
    case TOR_GHAR = 32;
    case UPPER_CHITRAL = 33;
    case UPPER_DIR = 34;
    case UPPER_KOHISTAN = 35;

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
