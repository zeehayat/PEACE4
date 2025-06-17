<?php

namespace App\Services;

use App\Models\CBO;
use Illuminate\Database\Eloquent\Collection;

/**
 * Service class for CBO (Community Based Organization) related operations.
 */
class CBOService
{
    protected CBO $cbo;

    /**
     * CBOService constructor.
     *
     * @param CBO $cbo The CBO model instance.
     */
    public function __construct(CBO $cbo)
    {
        $this->cbo = $cbo;
    }

    /**
     * Get all CBOs.
     *
     * @return Collection A collection of CBO models.
     */
    public function getAll(): Collection
    {
        return $this->cbo->all();
    }

    /**
     * Find a CBO by its ID.
     *
     * @param int $id The ID of the CBO.
     * @return CBO|null The CBO model instance, or null if not found.
     */
    public function findById(int $id): ?CBO
    {
        return $this->cbo->find($id);
    }

    /**
     * Create a new CBO.
     *
     * @param array $data The data for creating the CBO.
     * @return CBO The newly created CBO model instance.
     */
    public function create(array $data): CBO
    {
        return $this->cbo->create($data);
    }

    /**
     * Update an existing CBO.
     *
     * @param int $id The ID of the CBO to update.
     * @param array $data The data to update the CBO with.
     * @return CBO|null The updated CBO model instance, or null if not found.
     */
    public function update(int $id, array $data): ?CBO
    {
        $cbo = $this->findById($id);
        if ($cbo) {
            $cbo->update($data);
        }
        return $cbo;
    }

    /**
     * Delete a CBO.
     *
     * @param int $id The ID of the CBO to delete.
     * @return bool True if the CBO was deleted, false otherwise.
     */
    public function delete(int $id): bool
    {
        $cbo = $this->findById($id);
        if ($cbo) {
            return $cbo->delete();
        }
        return false;
    }
}
