<?php

namespace Database\Factories;

use App\Models\Attachment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttachmentFactory extends Factory
{
    protected $model = Attachment::class;

    public function definition(): array
    {
        return [
            'attachable_id' => 1, // Override when attaching
            'attachable_type' => 'App\\Models\\Cbo',
            'file_path' => 'uploads/' . $this->faker->uuid . '.pdf',
            'uploaded_at' => now(),
            'description' => $this->faker->sentence(),
        ];
    }
}
