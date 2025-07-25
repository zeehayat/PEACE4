<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Models\MhpAdminApproval;
use App\Models\TAndDWork;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MhpSiteTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Storage::fake('public');
    }

    // ... (passing tests) ...

    /**
     * Test T&D Work can be created and updated for an MHP site.
     */
    public function test_mhp_site_t_and_d_work_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();

        $tAndDData = TAndDWork::factory()->make([
            'date_of_initiation' => '2025-01-01',
            'step_up_transformers' => [['kva' => 50, 'qty' => 2]],
            'step_down_transformers' => [['kva' => 25, 'qty' => 4]],
        ])->toArray();

        $file = UploadedFile::fake()->create('td_plan.pdf', 200, 'application/pdf');
        $tAndDData['attachments'] = [$file];

        // Store new T&D Work
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.t-and-d-works.store', ['site' => $site->id]), $tAndDData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $tAndDWork = TAndDWork::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($tAndDWork);
        $this->assertDatabaseHas('transmission_and_distribution_works', [
            'id' => $tAndDWork->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // CORRECT: Assert with morph alias
            'name' => $tAndDData['name'],
        ]);
        $this->assertCount(1, $tAndDWork->getMedia('attachments'));
        Storage::disk('public')->assertExists($tAndDWork->getMedia('attachments')->first()->getPathRelativeToRoot());

        // Update existing T&D Work
        $updatedTAndDData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the update payload
            'name' => 'Updated T&D Work Name',
            'ht_poles_quantity' => 100,
            'date_of_initiation' => $tAndDWork->date_of_initiation->format('Y-m-d'),
            'step_up_transformers' => $tAndDWork->step_up_transformers,
            'step_down_transformers' => $tAndDWork->step_down_transformers,
            'ht_conductor_length_km' => $tAndDWork->ht_conductor_length_km,
            'ht_conductor_type' => $tAndDWork->ht_conductor_type,
            'lt_conductor_length_km' => $tAndDWork->lt_conductor_length_km,
            'lt_conductor_type' => $tAndDWork->lt_conductor_type,
            'scope_of_work' => $tAndDWork->scope_of_work,
            'remarks' => $tAndDWork->remarks,
            'attachments' => [],
            'attachments_to_delete' => [],
        ];

        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.t-and-d-works.update', ['site' => $site->id, 't_and_d_work' => $tAndDWork->id]), $updatedTAndDData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('transmission_and_distribution_works', [
            'id' => $tAndDWork->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // CORRECT: Assert with morph alias
            'name' => 'Updated T&D Work Name',
            'ht_poles_quantity' => 100,
        ]);
        $tAndDWork->refresh();
        $this->assertCount(1, $tAndDWork->getMedia('attachments'));
    }

    /**
     * Test Project Physical Progress can be created and updated.
     */
    public function test_project_physical_progress_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();
        $tAndDWork = TAndDWork::factory()->create([
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
        ]);

        $progressData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'progress_percentage' => 25.50,
            'progress_date' => '2025-04-01',
            'remarks' => 'Initial civil work progress.',
            'payment_for' => 'Civil',
            'activity_id' => null,
            'activity_type' => null,
        ];

        $file = UploadedFile::fake()->create('progress_report.pdf', 150, 'application/pdf');
        $progressData['attachments'] = [$file];

        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.physical-progresses.store', ['site' => $site->id]), $progressData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $progress = ProjectPhysicalProgress::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($progress);
        $this->assertDatabaseHas('project_physical_progresses', [
            'id' => $progress->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'progress_percentage' => 25.50,
            'payment_for' => 'Civil',
        ]);
        $this->assertCount(1, $progress->getMedia('attachments'));

        // Store new Physical Progress (T&D)
        $tAndDProgressData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'progress_percentage' => 50.00,
            'progress_date' => '2025-05-01',
            'remarks' => 'T&D pole erection progress.',
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => 't_and_d_work', // <--- FIX: Send the morph alias string in the payload
        ];
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.physical-progresses.store', ['site' => $site->id]), $tAndDProgressData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_physical_progresses', [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'progress_percentage' => 50.00,
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => 't_and_d_work',
        ]);

        // Update existing Physical Progress
        $updatedProgressData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'progress_percentage' => 75.00,
            'progress_date' => '2025-06-01',
            'remarks' => 'Updated civil work progress.',
            'payment_for' => 'Civil',
            'activity_id' => null,
            'activity_type' => null,
            'attachments' => [],
            'attachments_to_delete' => [],
        ];
        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.physical-progresses.update', ['site' => $site->id, 'physical_progress' => $progress->id]), $updatedProgressData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_physical_progresses', [
            'id' => $progress->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'progress_percentage' => 75.00,
            'remarks' => 'Updated civil work progress.',
        ]);
        $progress->refresh();
        $this->assertCount(1, $progress->getMedia('attachments'));
    }

    /**
     * Test Project Financial Installment can be created and updated.
     */
    public function test_project_financial_installment_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();
        $tAndDWork = TAndDWork::factory()->create([
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
        ]);

        $installmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'installment_number' => 1,
            'installment_date' => '2025-01-01',
            'installment_amount' => 100000.00,
            'category' => 'Initial',
            'remarks' => 'First installment for civil work.',
            'payment_for' => 'Civil',
            'activity_id' => null,
            'activity_type' => null,
        ];

        $file = UploadedFile::fake()->create('invoice.pdf', 80, 'application/pdf');
        $installmentData['attachments'] = [$file];

        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.financial-installments.store', ['site' => $site->id]), $installmentData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $installment = ProjectFinancialInstallment::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($installment);
        $this->assertDatabaseHas('project_financial_installments', [
            'id' => $installment->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'installment_number' => 1,
            'installment_amount' => 100000.00,
            'payment_for' => 'Civil',
        ]);
        $this->assertCount(1, $installment->getMedia('attachments'));

        // Store new Financial Installment (T&D)
        $tAndDInstallmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'installment_number' => 2,
            'installment_date' => '2025-02-01',
            'installment_amount' => 250000.00,
            'category' => 'Mid-term',
            'remarks' => 'Second installment for T&D.',
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => 't_and_d_work', // <--- FIX: Send the morph alias string in the payload
        ];
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.financial-installments.store', ['site' => $site->id]), $tAndDInstallmentData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_financial_installments', [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'installment_number' => 2,
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => 't_and_d_work',
        ]);

        // Update existing Financial Installment
        $updatedInstallmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site', // <--- FIX: Send the morph alias string in the payload
            'installment_number' => 1, // Keep same number for update
            'installment_date' => '2025-01-15',
            'installment_amount' => 120000.00,
            'category' => 'Initial (Revised)',
            'remarks' => 'Revised first installment.',
            'payment_for' => 'Civil',
            'activity_id' => null,
            'activity_type' => null,
            'attachments' => [],
            'attachments_to_delete' => [],
        ];
        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.financial-installments.update', ['site' => $site->id, 'financial_installment' => $installment->id]), $updatedInstallmentData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_financial_installments', [
            'id' => $installment->id,
            'projectable_id' => $site->id,
            'projectable_type' => 'mhp_site',
            'installment_amount' => 120000.00,
            'remarks' => 'Revised first installment.',
        ]);
        $installment->refresh();
        $this->assertCount(1, $installment->getMedia('attachments'));
    }
}
