<?php

namespace App\Services;

use App\Models\CBOActivity;
use Illuminate\Database\Eloquent\Collection;

/**
 * Service class for CBO Activity related operations.
 */
class CBOActivityService
{
    protected CBOActivity $cboActivity;

    /**
     * CBOActivityService constructor.
     *
     * @param CBOActivity $cboActivity The CBOActivity model instance.
     */
    public function __construct(CBOActivity $cboActivity)
    {
        $this->cboActivity = $cboActivity;
    }

    /**
     * Get all CBO Activities.
     *
     * @return Collection A collection of CBOActivity models.
     */
    public function getAll(): Collection
    {
        return $this->cboActivity->all();
    }

    /**
     * Find a CBO Activity by its ID.
     *
     * @param int $id The ID of the CBO Activity.
     * @return CBOActivity|null The CBOActivity model instance, or null if not found.
     */
    public function findById(int $id): ?CBOActivity
    {
        return $this->cboActivity->find($id);
    }

    /**
     * Create a new CBO Activity.
     *
     * @param array $data The data for creating the CBO Activity.
     * @return CBOActivity The newly created CBOActivity model instance.
     */
    public function create(array $data): CBOActivity
    {
        return $this->cboActivity->create($data);
    }

    /**
     * Update an existing CBO Activity.
     *
     * @param int $id The ID of the CBO Activity to update.
     * @param array $data The data to update the CBO Activity with.
     * @return CBOActivity|null The updated CBOActivity model instance, or null if not found.
     */
    public function update(int $id, array $data): ?CBOActivity
    {
        $activity = $this->findById($id);
        if ($activity) {
            $activity->update($data);
        }
        return $activity;
    }

    /**
     * Delete a CBO Activity.
     *
     * @param int $id The ID of the CBO Activity to delete.
     * @return bool True if the CBO Activity was deleted, false otherwise.
     */
    public function delete(int $id): bool
    {
        $activity = $this->findById($id);
        if ($activity) {
            return $activity->delete();
        }
        return false;
    }
}
