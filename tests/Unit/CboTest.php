<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Cbo;
use App\Models\Mhp;
use App\Models\IrrigationScheme;
use App\Models\CboActivity;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CboTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_cbo_record()
    {
        $cbo = Cbo::create([
            'reference_code' => 'CBO-001',
            'district' => 'Swat',
            'tehsil' => 'Bahrain',
            'vc_nc' => 'Mankial',
            'village' => 'Ashuran',
        ]);

        $this->assertDatabaseHas('cbos', ['reference_code' => 'CBO-001']);
    }

    /** @test */
    public function it_can_have_multiple_mhps()
    {
        $cbo = Cbo::factory()->create();
        Mhp::factory()->count(2)->create(['cbo_id' => $cbo->id]);

        $this->assertCount(2, $cbo->mhps);
    }

    /** @test */
    public function it_can_have_multiple_irrigation_schemes()
    {
        $cbo = Cbo::factory()->create();
        IrrigationScheme::factory()->count(3)->create(['cbo_id' => $cbo->id]);

        $this->assertCount(3, $cbo->irrigationSchemes);
    }

    /** @test */
    public function it_can_have_multiple_activities()
    {
        $cbo = Cbo::factory()->create();
        CboActivity::factory()->count(4)->create(['cbo_id' => $cbo->id]);

        $this->assertCount(4, $cbo->cboActivities);
    }
}
