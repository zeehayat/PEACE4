<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Models\MhpAdminApproval;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
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

        // Create a test user (assuming default Laravel user model)
        $this->user = User::factory()->create();

        // Ensure storage disk is set for testing file uploads
        Storage::fake('cloudflare_r2'); // Use your R2 disk name for faking
        // Or if you want to test against 'public' disk for local testing:
        // Storage::fake('public');
    }

    /**
     * Test that an MHP site can be created.
     */
    public function test_mhp_site_can_be_created(): void
    {
        $cbo = Cbo::factory()->create();
        $siteData = MhpSite::factory()->make([
            'cbo_id' => $cbo->id,
            'month_year_establishment' => '2020-01-01', // Example date
            'tentative_completion_date' => '2025-12-31',
            'financial_initiation_date' => '2021-01-15',
            'physical_completion_date' => '2025-12-01',
        ])->toArray();

        // Attach a dummy file for testing upload
        $file = UploadedFile::fake()->image('site_photo.jpg');
        $siteData['attachments'] = [$file];

        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.store'), $siteData);

        $response->assertStatus(302) // Redirects on success
        ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('mhp_sites', [
            'cbo_id' => $cbo->id,
            'population' => $siteData['population'],
            'status' => $siteData['status'],
        ]);

        $mhpSite = MhpSite::firstWhere('cbo_id', $cbo->id);
        $this->assertNotNull($mhpSite);
        $this->assertCount(1, $mhpSite->getMedia('attachments')); // Verify attachment
        Storage::disk('public')->assertExists($mhpSite->getMedia('attachments')->first()->getPathRelativeToRoot());


    }

    /**
     * Test that an MHP site can be updated.
     */
    public function test_mhp_site_can_be_updated(): void
    {
        $site = MhpSite::factory()->create();
        $newCbo = Cbo::factory()->create();

        $updatedData = [
            'cbo_id' => $newCbo->id,
            'population' => 9999,
            'remarks' => 'Updated remarks for the site.',
            'status' => 'Upgradation',
            // Include all required fields from the form request, even if not changed
            'month_year_establishment' => $site->month_year_establishment->format('Y-m-d'),
            'established_by' => $site->established_by,
            'grid_status' => $site->grid_status,
            'existing_capacity_kw' => $site->existing_capacity_kw,
            'planned_capacity_kw' => $site->planned_capacity_kw,
            'head_ft' => $site->head_ft,
            'design_discharge_cusecs' => $site->design_discharge_cusecs,
            'channel_length_km' => $site->channel_length_km,
            'tl_ht_km' => $site->tl_ht_km,
            'tl_lt_km' => $site->tl_lt_km,
            'turbine_type' => $site->turbine_type,
            'alternator_type' => $site->alternator_type,
            'accessible' => $site->accessible,
            'domestic_units' => $site->domestic_units,
            'commercial_units' => $site->commercial_units,
            'estimated_cost' => $site->estimated_cost,
            'per_kw_cost' => $site->per_kw_cost,
            'total_hh' => $site->total_hh,
            'avg_hh_size' => $site->avg_hh_size,
            'cost_per_capita' => $site->cost_per_capita,
            'tentative_completion_date' => $site->tentative_completion_date->format('Y-m-d'),
            'financial_initiation_date' => $site->financial_initiation_date->format('Y-m-d'),
            'physical_completion_date' => $site->physical_completion_date->format('Y-m-d'),
            // New fields, ensure they are present or nullable
            'observed_discharge' => $site->observed_discharge,
            'intake_details' => $site->intake_details,
            'settling_basin_details' => $site->settling_basin_details,
            'approach_culvert_details' => $site->approach_culvert_details,
            'headrace_channel_details' => $site->headrace_channel_details,
            'aqueduct_details' => $site->aqueduct_details,
            'tailrace_details' => $site->tailrace_details,
            'spillway_details' => $site->spillway_details,
            'retaining_walls_details' => $site->retaining_walls_details,
            'design_net_head' => $site->design_net_head,
            'proposed_capacity_kw' => $site->proposed_capacity_kw,
            'length_ft' => $site->length_ft,
            'bottom_width_ft' => $site->bottom_width_ft,
            'design_depth_ft' => $site->design_depth_ft,
            'freeboard_ft' => $site->freeboard_ft,
            'velocity_ft_per_sec' => $site->velocity_ft_per_sec,
            'attachments' => [], // No new attachments
            'attachments_to_delete' => [],
        ];

        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.update', $site->id), $updatedData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('mhp_sites', [
            'id' => $site->id,
            'cbo_id' => $newCbo->id,
            'population' => 9999,
            'remarks' => 'Updated remarks for the site.',
            'status' => 'Upgradation',
        ]);
    }

    /**
     * Test that an MHP site can be deleted.
     */
    public function test_mhp_site_can_be_deleted(): void
    {
        $site = MhpSite::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson(route('mhp.sites.destroy', $site->id));

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('mhp_sites', ['id' => $site->id]);
    }

    /**
     * Test MHP site creation requires valid data.
     */
    public function test_mhp_site_creation_requires_valid_data(): void
    {
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.store'), []);

        $response->assertStatus(422) // Unprocessable Entity due to validation errors
        ->assertJsonValidationErrors(['cbo_id', 'grid_status', 'status']);
    }

    /**
     * Test MHP site update requires valid data.
     */
    public function test_mhp_site_update_requires_valid_data(): void
    {
        $site = MhpSite::factory()->create();

        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.update', $site->id), [
            'cbo_id' => 9999, // Invalid CBO ID
            'grid_status' => 'Invalid Status',
            'status' => 'Bad Status',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cbo_id', 'grid_status', 'status']);
    }

    /**
     * Test that attachments can be uploaded during MHP site creation.
     */
    public function test_mhp_site_attachments_can_be_uploaded_on_creation(): void
    {
        $cbo = Cbo::factory()->create();
        $siteData = MhpSite::factory()->make([
            'cbo_id' => $cbo->id,
            'month_year_establishment' => '2025-01-01',
            'tentative_completion_date' => '2025-12-31',
            'financial_initiation_date' => '2025-01-15',
            'physical_completion_date' => '2025-12-01',
        ])->toArray();

        $file1 = UploadedFile::fake()->image('document1.jpg');
        $file2 = UploadedFile::fake()->create('report.pdf', 500, 'application/pdf'); // 500 KB PDF

        $siteData['attachments'] = [$file1, $file2];

        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.store'), $siteData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $mhpSite = MhpSite::firstWhere('cbo_id', $cbo->id);
        $this->assertNotNull($mhpSite);
        $this->assertCount(2, $mhpSite->getMedia('attachments'));
        Storage::disk('public')->assertExists($mhpSite->getMedia('attachments')->first()->getPathRelativeToRoot());
        Storage::disk('public')->assertExists($mhpSite->getMedia('attachments')->last()->getPathRelativeToRoot());


    }

    /**
     * Test that attachments can be deleted during MHP site update.
     */
    public function test_mhp_site_attachments_can_be_deleted_on_update(): void
    {
        $site = MhpSite::factory()->create();
        $file1 = UploadedFile::fake()->image('original1.jpg');
        $file2 = UploadedFile::fake()->image('original2.jpg');

        // Add initial media
        $site->addMedia($file1)->toMediaCollection('attachments');
        $site->addMedia($file2)->toMediaCollection('attachments');

        $this->assertCount(2, $site->getMedia('attachments'));

        $mediaToDeleteId = $site->getMedia('attachments')->first()->id;

        $updatedData = [
            'cbo_id' => $site->cbo_id, // Keep required fields
            'population' => $site->population,
            'status' => $site->status,
            'grid_status' => $site->grid_status,
            'month_year_establishment' => $site->month_year_establishment->format('Y-m-d'),
            'established_by' => $site->established_by,
            'tentative_completion_date' => $site->tentative_completion_date->format('Y-m-d'),
            'financial_initiation_date' => $site->financial_initiation_date->format('Y-m-d'),
            'physical_completion_date' => $site->physical_completion_date->format('Y-m-d'),
            'head_ft' => $site->head_ft,
            'design_discharge_cusecs' => $site->design_discharge_cusecs,
            'channel_length_km' => $site->channel_length_km,
            'tl_ht_km' => $site->tl_ht_km,
            'tl_lt_km' => $site->tl_lt_km,
            'turbine_type' => $site->turbine_type,
            'alternator_type' => $site->alternator_type,
            'accessible' => $site->accessible,
            'domestic_units' => $site->domestic_units,
            'commercial_units' => $site->commercial_units,
            'estimated_cost' => $site->estimated_cost,
            'per_kw_cost' => $site->per_kw_cost,
            'total_hh' => $site->total_hh,
            'avg_hh_size' => $site->avg_hh_size,
            'cost_per_capita' => $site->cost_per_capita,
            'remarks' => $site->remarks,
            'observed_discharge' => $site->observed_discharge,
            'intake_details' => $site->intake_details,
            'settling_basin_details' => $site->settling_basin_details,
            'approach_culvert_details' => $site->approach_culvert_details,
            'headrace_channel_details' => $site->headrace_channel_details,
            'aqueduct_details' => $site->aqueduct_details,
            'tailrace_details' => $site->tailrace_details,
            'spillway_details' => $site->spillway_details,
            'retaining_walls_details' => $site->retaining_walls_details,
            'design_net_head' => $site->design_net_head,
            'proposed_capacity_kw' => $site->proposed_capacity_kw,
            'length_ft' => $site->length_ft,
            'bottom_width_ft' => $site->bottom_width_ft,
            'design_depth_ft' => $site->design_depth_ft,
            'freeboard_ft' => $site->freeboard_ft,
            'velocity_ft_per_sec' => $site->velocity_ft_per_sec,
            'attachments' => [], // No new attachments
            'attachments_to_delete' => [$mediaToDeleteId],
        ];

        $response = $this->actingAs($this->user)->putJson(route('mhp.sites.update', $site->id), $updatedData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $site->refresh(); // Refresh the model instance
        $this->assertCount(1, $site->getMedia('attachments')); // One attachment should remain
        Storage::disk('public')->assertExists($site->adminApproval->getMedia('attachments')->first()->getPathRelativeToRoot());


// Verify file is deleted from fake disk
    }

    /**
     * Test MHP Admin Approval can be stored or updated.
     */
    public function test_mhp_admin_approval_can_be_stored_or_updated(): void
    {
        $site = MhpSite::factory()->create();
        $approvalData = MhpAdminApproval::factory()->make([
            'mhp_site_id' => $site->id,
            'eu_approval_date' => '2025-02-01',
            'hpp_inauguration_date' => '2025-03-01',
        ])->toArray();

        $file = UploadedFile::fake()->create('approval.pdf', 100, 'application/pdf');
        $approvalData['attachments'] = [$file];

        // Store new approval
        $response = $this->actingAs($this->user)->postJson(route('mhp.admin-approvals.store'), $approvalData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('mhp_admin_approvals', ['mhp_site_id' => $site->id]);
        $site->refresh();
        $this->assertNotNull($site->adminApproval);
        $this->assertCount(1, $site->adminApproval->getMedia('attachments'));
        Storage::disk('public')->assertExists($site->adminApproval->getMedia('attachments')->first()->getPathRelativeToRoot());


        // Update existing approval
        $existingApproval = $site->adminApproval;
        $updatedApprovalData = [
            'mhp_site_id' => $site->id,
            'approved_cost' => 500000.00,
            'remarks' => 'Revised approval remarks.',
            'eu_approval_date' => $existingApproval->eu_approval_date->format('Y-m-d'), // Keep required dates
            'hpp_inauguration_date' => $existingApproval->hpp_inauguration_date->format('Y-m-d'),
            'technical_survey_date' => $existingApproval->technical_survey_date?->format('Y-m-d'),
            'date_design_psu_submission' => $existingApproval->date_design_psu_submission?->format('Y-m-d'),
            'headoffice_review_submission_date' => $existingApproval->headoffice_review_submission_date?->format('Y-m-d'),
            'design_estimate_date' => $existingApproval->design_estimate_date?->format('Y-m-d'),
            'eu_approval_submission_date' => $existingApproval->eu_approval_submission_date?->format('Y-m-d'),
            'opm_validation_date' => $existingApproval->opm_validation_date?->format('Y-m-d'),
            'attachments' => [],
            'attachments_to_delete' => [],
        ];

        $response = $this->actingAs($this->user)->putJson(route('mhp.admin-approvals.update', $existingApproval->id), $updatedApprovalData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('mhp_admin_approvals', [
            'id' => $existingApproval->id,
            'approved_cost' => 500000.00,
            'remarks' => 'Revised approval remarks.',
        ]);
        $existingApproval->refresh();
        $this->assertCount(1, $existingApproval->getMedia('attachments')); // Still one attachment
    }

    /**
     * Test T&D Work can be created and updated for an MHP site.
     */
    public function test_mhp_site_t_and_d_work_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();

        $tAndDData = TAndDWork::factory()->make([
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
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

        $this->assertDatabaseHas('transmission_and_distribution_works', [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
            'name' => $tAndDData['name'],
        ]);

        $tAndDWork = TAndDWork::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($tAndDWork);
        $this->assertCount(1, $tAndDWork->getMedia('attachments'));
        Storage::disk('public')->assertExists($site->adminApproval->getMedia('attachments')->first()->getPathRelativeToRoot());



        // Update existing T&D Work
        $updatedTAndDData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
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
            'name' => 'Updated T&D Work Name',
            'ht_poles_quantity' => 100,
        ]);
        $tAndDWork->refresh();
        $this->assertCount(1, $tAndDWork->getMedia('attachments')); // Still one attachment
    }

    /**
     * Test Project Physical Progress can be created and updated.
     */
    public function test_project_physical_progress_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();
        $tAndDWork = TAndDWork::factory()->create([
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
        ]);

        $progressData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
            'progress_percentage' => 25.50,
            'progress_date' => '2025-04-01',
            'remarks' => 'Initial civil work progress.',
            'payment_for' => 'Civil', // Test Civil type first
            'activity_id' => null,
            'activity_type' => null,
        ];

        $file = UploadedFile::fake()->create('progress_report.pdf', 150, 'application/pdf');
        $progressData['attachments'] = [$file];

        // Store new Physical Progress (Civil)
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.physical-progresses.store', ['site' => $site->id]), $progressData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('project_physical_progresses', [
            'projectable_id' => $site->id,
            'progress_percentage' => 25.50,
            'payment_for' => 'Civil',
        ]);
        $progress = ProjectPhysicalProgress::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($progress);
        $this->assertCount(1, $progress->getMedia('attachments'));

        // Store new Physical Progress (T&D)
        $tAndDProgressData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
            'progress_percentage' => 50.00,
            'progress_date' => '2025-05-01',
            'remarks' => 'T&D pole erection progress.',
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => MhpSite::class, // This will be corrected by service to TAndDWork::class
        ];
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.physical-progresses.store', ['site' => $site->id]), $tAndDProgressData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_physical_progresses', [
            'projectable_id' => $site->id,
            'progress_percentage' => 50.00,
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => TAndDWork::class, // Should be corrected by service
        ]);

        // Update existing Physical Progress
        $updatedProgressData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
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
            'progress_percentage' => 75.00,
            'remarks' => 'Updated civil work progress.',
        ]);
        $progress->refresh();
        $this->assertCount(1, $progress->getMedia('attachments')); // Attachment should still be there
    }

    /**
     * Test Project Financial Installment can be created and updated.
     */
    public function test_project_financial_installment_can_be_created_and_updated(): void
    {
        $site = MhpSite::factory()->create();
        $tAndDWork = TAndDWork::factory()->create([
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
        ]);

        $installmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
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

        // Store new Financial Installment (Civil)
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.financial-installments.store', ['site' => $site->id]), $installmentData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('project_financial_installments', [
            'projectable_id' => $site->id,
            'installment_number' => 1,
            'installment_amount' => 100000.00,
            'payment_for' => 'Civil',
        ]);
        $installment = ProjectFinancialInstallment::firstWhere('projectable_id', $site->id);
        $this->assertNotNull($installment);
        $this->assertCount(1, $installment->getMedia('attachments'));

        // Store new Financial Installment (T&D)
        $tAndDInstallmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
            'installment_number' => 2,
            'installment_date' => '2025-02-01',
            'installment_amount' => 250000.00,
            'category' => 'Mid-term',
            'remarks' => 'Second installment for T&D.',
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => MhpSite::class, // This will be corrected by service to TAndDWork::class
        ];
        $response = $this->actingAs($this->user)->postJson(route('mhp.sites.financial-installments.store', ['site' => $site->id]), $tAndDInstallmentData);

        $response->assertStatus(302)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseHas('project_financial_installments', [
            'projectable_id' => $site->id,
            'installment_number' => 2,
            'payment_for' => 'T&D',
            'activity_id' => $tAndDWork->id,
            'activity_type' => TAndDWork::class, // Should be corrected by service
        ]);

        // Update existing Financial Installment
        $updatedInstallmentData = [
            'projectable_id' => $site->id,
            'projectable_type' => MhpSite::class,
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
            'installment_amount' => 120000.00,
            'remarks' => 'Revised first installment.',
        ]);
        $installment->refresh();
        $this->assertCount(1, $installment->getMedia('attachments')); // Attachment should still be there
    }
}
