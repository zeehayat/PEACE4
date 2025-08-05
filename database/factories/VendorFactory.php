<?php

namespace Database\Factories;

use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

class VendorFactory extends Factory
{
    protected $model = Vendor::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'contact_person' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'address' => $this->faker->address,
            'ntn_no' => $this->faker->unique()->randomNumber(9), // FIX: Add ntn_no
            'status' => $this->faker->randomElement(['APPROVED', 'NEW', 'BLACK-LISTED', 'UNAPPROVED', 'OLD']), // Add status
            'remarks' => $this->faker->paragraph(), // Add remarks
        ];
    }
}
