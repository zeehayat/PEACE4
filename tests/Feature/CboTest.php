<?php
    namespace Tests\Feature;

    use App\Models\Cbo;
    use App\Models\CboDialogue;
    use App\Models\CboExposureVisit;
    use App\Models\CboTraining;
    use App\Models\User;
    use Illuminate\Foundation\Testing\RefreshDatabase;
    use Illuminate\Foundation\Testing\WithFaker;
    use Illuminate\Http\UploadedFile;
    use Illuminate\Support\Facades\Storage;
    use Tests\TestCase;
    use Illuminate\Database\Eloquent\Relations\Relation; // For enforcing morph map in tests

    class CboTest extends TestCase
    {
        use RefreshDatabase, WithFaker;

        protected User $user;

        protected function setUp(): void
        {
            parent::setUp();

            // Create a test user
            $this->user = User::factory()->create();

            // Fake the public storage disk for file uploads in tests
            Storage::fake('public');

            // Ensure morph map is enforced for polymorphic relationships in tests (e.g., Spatie Media Library)
            // This is crucial if your AppServiceProvider's boot method isn't fully re-booted for each test
            Relation::enforceMorphMap([
                'cbo' => \App\Models\Cbo::class,
                'cbo_dialogue' => \App\Models\CboDialogue::class,
                'cbo_exposure_visit' => \App\Models\CboExposureVisit::class,
                'cbo_training' => \App\Models\CboTraining::class,
                // Add any other polymorphic models here if they are targets of morph relations
            ]);
        }

        // --- CBO (Main) Tests ---

        /**
         * Test a CBO can be created.
         */
        public function test_cbo_can_be_created(): void
        {
            $cboData = Cbo::factory()->make()->toArray();
            $file = UploadedFile::fake()->image('cbo_logo.jpg');
            $cboData['attachments'] = [$file];
            $cboData['remarks'] = $this->faker->paragraph; // Ensure remarks is set

            $response = $this->actingAs($this->user)->postJson(route('cbo.cbos.store'), $cboData);

            $response->assertStatus(302) // Redirect on success
            ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbos', [
                'reference_code' => $cboData['reference_code'],
                'district' => $cboData['district'],
                'remarks' => $cboData['remarks'],
            ]);

            $cbo = Cbo::firstWhere('reference_code', $cboData['reference_code']);
            $this->assertNotNull($cbo);
            $this->assertCount(1, $cbo->getMedia('attachments'));
            Storage::disk('public')->assertExists($cbo->getMedia('attachments')->first()->getPathRelativeToRoot());
        }

        /**
         * Test a CBO can be updated.
         */
        public function test_cbo_can_be_updated(): void
        {
            $cbo = Cbo::factory()->create();
            $updatedData = [
                'reference_code' => 'UPDATED-CBO-001',
                'district' => 'Updated District',
                'remarks' => 'Updated CBO remarks here.', // Ensure remarks is updated
                // Include all required fields from the form request
                'tehsil' => $cbo->tehsil,
                'village_council' => $cbo->village_council,
                'village' => $cbo->village,
                'date_of_formation' => $cbo->date_of_formation->format('Y-m-d'), // Format date for request
                'total_members' => $cbo->total_members,
                'gender' => $cbo->gender,
                'num_cbo_members' => $cbo->num_cbo_members,
                'president_name' => $cbo->president_name,
                'president_contact' => $cbo->president_contact,
                'secretary_name' => $cbo->secretary_name,
                'secretary_contact' => $cbo->secretary_contact,
                'attachments' => [],
                'attachments_to_delete' => [],
            ];

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.update', $cbo->id), $updatedData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbos', [
                'id' => $cbo->id,
                'reference_code' => 'UPDATED-CBO-001',
                'district' => 'Updated District',
                'remarks' => 'Updated CBO remarks here.',
            ]);
        }

        /**
         * Test a CBO can be deleted.
         */
        public function test_cbo_can_be_deleted(): void
        {
            $cbo = Cbo::factory()->create();
            // Add related data and attachments to ensure cascade delete works
            $dialogue = CboDialogue::factory()->create(['cbo_id' => $cbo->id]);
            $dialogue->addMedia(UploadedFile::fake()->create('dialogue.pdf'))->toMediaCollection('attachments');

            $this->assertDatabaseHas('cbos', ['id' => $cbo->id]);
            $this->assertDatabaseHas('cbo_dialogues', ['id' => $dialogue->id]);
            $dialogueMediaPath = $dialogue->getMedia('attachments')->first()->getPathRelativeToRoot(); // Get path before deletion
            Storage::disk('public')->assertExists($dialogueMediaPath); // Ensure it exists before delete

            $response = $this->actingAs($this->user)->deleteJson(route('cbo.cbos.destroy', $cbo->id));

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseMissing('cbos', ['id' => $cbo->id]);
            $this->assertDatabaseMissing('cbo_dialogues', ['id' => $dialogue->id]); // DB cascade
            Storage::disk('public')->assertMissing($dialogueMediaPath); // FIX: Assert the specific file path is missing
        }

        /**
         * Test CBO creation requires valid data.
         */
        public function test_cbo_creation_requires_valid_data(): void
        {
            $response = $this->actingAs($this->user)->postJson(route('cbo.cbos.store'), []);

            $response->assertStatus(422)
                ->assertJsonValidationErrors(['reference_code', 'district', 'tehsil', 'village_council', 'village', 'date_of_formation', 'total_members', 'gender', 'num_cbo_members', 'president_name', 'president_contact', 'secretary_name', 'secretary_contact']);
        }

        /**
         * Test CBO update requires valid data.
         */
        public function test_cbo_update_requires_valid_data(): void
        {
            $cbo = Cbo::factory()->create();
            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.update', $cbo->id), [
                'reference_code' => null, // Invalid
                'district' => '',         // Invalid
                'gender' => 'Invalid',    // Invalid enum
                'total_members' => 0,     // Invalid min
            ]);

            $response->assertStatus(422)
                ->assertJsonValidationErrors(['reference_code', 'district', 'gender', 'total_members']);
        }

        /**
         * Test CBO attachments can be uploaded and deleted.
         */
        public function test_cbo_attachments_can_be_uploaded_and_deleted(): void
        {
            $cbo = Cbo::factory()->create(); // Create the CBO to update
            $file1 = UploadedFile::fake()->image('cbo_doc1.jpg');
            $file2 = UploadedFile::fake()->create('cbo_report.pdf', 200, 'application/pdf');

            // Add initial attachments to the created CBO
            $cbo->addMedia($file1)->toMediaCollection('attachments');
            $cbo->addMedia($file2)->toMediaCollection('attachments');
            $this->assertCount(2, $cbo->getMedia('attachments')); // Verify initial count

            // Get updated data from the existing CBO
            $updatedData = $cbo->toArray();
            $updatedData['date_of_formation'] = $cbo->date_of_formation->format('Y-m-d'); // Format date for request

            // Test deletion on update
            $mediaToDeleteId = $cbo->getMedia('attachments')->first()->id;
            $mediaToDeletePath = $cbo->getMedia('attachments')->first()->getPathRelativeToRoot();

            $updatedData['attachments_to_delete'] = [$mediaToDeleteId];
            $updatedData['attachments'] = []; // No new files for this part of the test

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.update', $cbo->id), $updatedData);
            $response->assertStatus(302)->assertSessionHasNoErrors();
            $cbo->refresh(); // Refresh the model to get updated media state
            $this->assertCount(1, $cbo->getMedia('attachments')); // One attachment should remain
            Storage::disk('public')->assertMissing($mediaToDeletePath); // Verify file is deleted from fake disk

            // Test uploading new attachments during an update
            $newFile = UploadedFile::fake()->image('new_cbo_doc.png');

            $updatedData = $cbo->toArray(); // Get current state of CBO
            $updatedData['date_of_formation'] = $cbo->date_of_formation->format('Y-m-d'); // Format date
            $updatedData['attachments'] = [$newFile]; // Add new file
            $updatedData['attachments_to_delete'] = []; // No deletions for this part

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.update', $cbo->id), $updatedData);
            $response->assertStatus(302)->assertSessionHasNoErrors();
            $cbo->refresh();
            $this->assertCount(2, $cbo->getMedia('attachments')); // Should now have 1 old + 1 new
            Storage::disk('public')->assertExists($cbo->getMedia('attachments')->last()->getPathRelativeToRoot()); // Assert new file exists
        }

        // --- CBO Dialogue Tests ---

        /**
         * Test a CBO Dialogue can be created.
         */
        public function test_cbo_dialogue_can_be_created(): void
        {
            $cbo = Cbo::factory()->create();
            $dialogueData = CboDialogue::factory()->make([
                'cbo_id' => $cbo->id,
            ])->toArray();
            // FIX: Ensure date is formatted correctly for database assertion
            // Use the exact string format found in the database for comparison.
            $dialogueData['date_of_dialogue'] = (new \DateTime($dialogueData['date_of_dialogue']))->format('Y-m-d 00:00:00');


            $file = UploadedFile::fake()->create('minutes.pdf', 100, 'application/pdf');
            $dialogueData['attachments'] = [$file];

            $response = $this->actingAs($this->user)->postJson(route('cbo.cbos.dialogues.store', ['cbo' => $cbo->id]), $dialogueData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_dialogues', [
                'cbo_id' => $cbo->id,
                'participants' => $dialogueData['participants'],
                'remarks' => $dialogueData['remarks'],
                'date_of_dialogue' => $dialogueData['date_of_dialogue'], // Assert the correct column name and format
            ]);

            $dialogue = CboDialogue::firstWhere('cbo_id', $cbo->id);
            $this->assertNotNull($dialogue);
            $this->assertCount(1, $dialogue->getMedia('attachments'));
            Storage::disk('public')->assertExists($dialogue->getMedia('attachments')->first()->getPathRelativeToRoot());
        }

        /**
         * Test a CBO Dialogue can be updated.
         */
        public function test_cbo_dialogue_can_be_updated(): void
        {
            $cbo = Cbo::factory()->create();
            $dialogue = CboDialogue::factory()->create(['cbo_id' => $cbo->id]);

            $updatedData = [
                'cbo_id' => $cbo->id,
                'participants' => 20,
                'remarks' => 'Updated dialogue remarks.',
                'date_of_dialogue' => (new \DateTime($dialogue->date_of_dialogue))->format('Y-m-d 00:00:00'), // FIX: Format date for update payload (Y-m-d 00:00:00)
                'attachments' => [],
                'attachments_to_delete' => [],
            ];

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.dialogues.update', ['cbo' => $cbo->id, 'dialogue' => $dialogue->id]), $updatedData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_dialogues', [
                'id' => $dialogue->id,
                'participants' => 20,
                'remarks' => 'Updated dialogue remarks.',
            ]);
        }

        /**
         * Test a CBO Dialogue can be deleted.
         */
        public function test_cbo_dialogue_can_be_deleted(): void
        {
            $cbo = Cbo::factory()->create();
            $dialogue = CboDialogue::factory()->create(['cbo_id' => $cbo->id]);
            $dialogue->addMedia(UploadedFile::fake()->create('dialogue_delete.pdf'))->toMediaCollection('attachments');

            $this->assertDatabaseHas('cbo_dialogues', ['id' => $dialogue->id]);
            $dialogueMediaPath = $dialogue->getMedia('attachments')->first()->getPathRelativeToRoot(); // Get path before deletion
            Storage::disk('public')->assertExists($dialogueMediaPath); // Ensure it exists before delete

            $response = $this->actingAs($this->user)->deleteJson(route('cbo.cbos.dialogues.destroy', ['cbo' => $cbo->id, 'dialogue' => $dialogue->id]));

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseMissing('cbo_dialogues', ['id' => $dialogue->id]);
            Storage::disk('public')->assertMissing($dialogueMediaPath); // FIX: Assert the specific file path is missing
        }

        // --- CBO Exposure Visit Tests ---

        /**
         * Test a CBO Exposure Visit can be created.
         */
        public function test_cbo_exposure_visit_can_be_created(): void
        {
            $cbo = Cbo::factory()->create();
            $visitData = CboExposureVisit::factory()->make([
                'cbo_id' => $cbo->id,
            ])->toArray();
            // FIX: Format date for database assertion (Y-m-d 00:00:00)
            $visitData['date_of_visit'] = (new \DateTime($visitData['date_of_visit']))->format('Y-m-d 00:00:00');

            $file = UploadedFile::fake()->create('visit_report.docx', 80, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            $visitData['attachments'] = [$file];

            $response = $this->actingAs($this->user)->postJson(route('cbo.cbos.exposure-visits.store', ['cbo' => $cbo->id]), $visitData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_exposure_visits', [
                'cbo_id' => $cbo->id,
                'purpose_of_visit' => $visitData['purpose_of_visit'],
                'date_of_visit' => $visitData['date_of_visit'], // Assert the correct column name and format
            ]);

            $visit = CboExposureVisit::firstWhere('cbo_id', $cbo->id);
            $this->assertNotNull($visit);
            $this->assertCount(1, $visit->getMedia('attachments'));
            Storage::disk('public')->assertExists($visit->getMedia('attachments')->first()->getPathRelativeToRoot());
        }

        /**
         * Test a CBO Exposure Visit can be updated.
         */
        public function test_cbo_exposure_visit_can_be_updated(): void
        {
            $cbo = Cbo::factory()->create();
            $visit = CboExposureVisit::factory()->create(['cbo_id' => $cbo->id]);

            $updatedData = [
                'cbo_id' => $cbo->id,
                'purpose_of_visit' => 'Updated Purpose',
                'remarks' => 'Updated visit remarks.',
                'date_of_visit' => $visit->date_of_visit->format('Y-m-d 00:00:00'), // FIX: Format date for update payload (Y-m-d 00:00:00)
                'attachments' => [],
                'attachments_to_delete' => [],
            ];

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.exposure-visits.update', ['cbo' => $cbo->id, 'exposure_visit' => $visit->id]), $updatedData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_exposure_visits', [
                'id' => $visit->id,
                'purpose_of_visit' => 'Updated Purpose',
                'remarks' => 'Updated visit remarks.',
            ]);
        }

        /**
         * Test a CBO Exposure Visit can be deleted.
         */
        public function test_cbo_exposure_visit_can_be_deleted(): void
        {
            $cbo = Cbo::factory()->create();
            $visit = CboExposureVisit::factory()->create(['cbo_id' => $cbo->id]);
            $visit->addMedia(UploadedFile::fake()->create('visit_delete.pdf'))->toMediaCollection('attachments');

            $this->assertDatabaseHas('cbo_exposure_visits', ['id' => $visit->id]);
            $visitMediaPath = $visit->getMedia('attachments')->first()->getPathRelativeToRoot(); // Get path before deletion
            Storage::disk('public')->assertExists($visitMediaPath); // Ensure it exists before delete

            $response = $this->actingAs($this->user)->deleteJson(route('cbo.cbos.exposure-visits.destroy', ['cbo' => $cbo->id, 'exposure_visit' => $visit->id]));

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseMissing('cbo_exposure_visits', ['id' => $visit->id]);
            Storage::disk('public')->assertMissing($visitMediaPath); // FIX: Assert the specific file path is missing
        }

        // --- CBO Training Tests ---

        /**
         * Test a CBO Training can be created.
         */
        public function test_cbo_training_can_be_created(): void
        {
            $cbo = Cbo::factory()->create();
            $trainingData = CboTraining::factory()->make([
                'cbo_id' => $cbo->id,
            ])->toArray();
            // FIX: Format date for database assertion (Y-m-d 00:00:00)
            $trainingData['date_of_training'] = (new \DateTime($trainingData['date_of_training']))->format('Y-m-d 00:00:00');

            $file = UploadedFile::fake()->create('training_cert.png', 120, 'image/png');
            $trainingData['attachments'] = [$file];

            $response = $this->actingAs($this->user)->postJson(route('cbo.cbos.trainings.store', ['cbo' => $cbo->id]), $trainingData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_trainings', [
                'cbo_id' => $cbo->id,
                'training_type' => $trainingData['training_type'],
                'date_of_training' => $trainingData['date_of_training'], // Assert the correct column name and format
            ]);

            $training = CboTraining::firstWhere('cbo_id', $cbo->id);
            $this->assertNotNull($training);
            $this->assertCount(1, $training->getMedia('attachments'));
            Storage::disk('public')->assertExists($training->getMedia('attachments')->first()->getPathRelativeToRoot());
        }

        /**
         * Test a CBO Training can be updated.
         */
        public function test_cbo_training_can_be_updated(): void
        {
            $cbo = Cbo::factory()->create();
            $training = CboTraining::factory()->create(['cbo_id' => $cbo->id]);

            $updatedData = [
                'cbo_id' => $cbo->id,
                'training_type' => 'Electrical Appliance',
                'remarks' => 'Updated training remarks.',
                'date_of_training' => \Carbon\Carbon::parse($training->date_of_training)->format('Y-m-d 00:00:00'),
                 // FIX: Format date for update payload (Y-m-d 00:00:00)
                'total_participants' => 15,
                'training_gender' => $training->training_gender, // Keep original or ensure valid
                'attachments' => [],
                'attachments_to_delete' => [],
            ];

            $response = $this->actingAs($this->user)->putJson(route('cbo.cbos.trainings.update', ['cbo' => $cbo->id, 'training' => $training->id]), $updatedData);

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseHas('cbo_trainings', [
                'id' => $training->id,
                'training_type' => 'Electrical Appliance',
                'remarks' => 'Updated training remarks.',
            ]);
        }

        /**
         * Test a CBO Training can be deleted.
         */
        public function test_cbo_training_can_be_deleted(): void
        {
            $cbo = Cbo::factory()->create();
            $training = CboTraining::factory()->create(['cbo_id' => $cbo->id]);
            $training->addMedia(UploadedFile::fake()->create('training_delete.pdf'))->toMediaCollection('attachments');

            $this->assertDatabaseHas('cbo_trainings', ['id' => $training->id]);
            $trainingMediaPath = $training->getMedia('attachments')->first()->getPathRelativeToRoot(); // Get path before deletion
            Storage::disk('public')->assertExists($trainingMediaPath); // Ensure it exists before delete

            $response = $this->actingAs($this->user)->deleteJson(route('cbo.cbos.trainings.destroy', ['cbo' => $cbo->id, 'training' => $training->id]));

            $response->assertStatus(302)
                ->assertSessionHasNoErrors();

            $this->assertDatabaseMissing('cbo_trainings', ['id' => $training->id]);
            Storage::disk('public')->assertMissing($trainingMediaPath); // FIX: Assert the specific file path is missing
        }
    }
