<?php

namespace App\Services;

use App\Models\MHPSite;
use Illuminate\Database\Eloquent\Collection;

/**
 * Service class for MHP Site related operations.
 */
class MHPSiteService
{
    protected MHPSite $mhpSite;

    /**
     * MHPSiteService constructor.
     *
     * @param MHPSite $mhpSite The MHPSite model instance.
     */
    public function __construct(MHPSite $mhpSite)
    {
        $this->mhpSite = $mhpSite;
    }

    /**
     * Get all MHP Sites.
     *
     * @return Collection A collection of MHPSite models.
     */
    public function getAll(): Collection
    {
        return $this->mhpSite->all();
    }

    /**
     * Find an MHP Site by its ID.
     *
     * @param int $id The ID of the MHP Site.
     * @return MHPSite|null The MHPSite model instance, or null if not found.
     */
    public function findById(int $id): ?MHPSite
    {
        return $this->mhpSite->find($id);
    }

    /**
     * Create a new MHP Site.
     *
     * @param array $data The data for creating the MHP Site.
     * @return MHPSite The newly created MHPSite model instance.
     */
    public function create(array $data): MHPSite
    {
        return $this->mhpSite->create($data);
    }

    /**
     * Update an existing MHP Site.
     *
     * @param int $id The ID of the MHP Site to update.
     * @param array $data The data to update the MHP Site with.
     * @return MHPSite|null The updated MHPSite model instance, or null if not found.
     */
    public function update(int $id, array $data): ?MHPSite
    {
        $mhpSite = $this->findById($id);
        if ($mhpSite) {
            $mhpSite->update($data);
        }
        return $mhpSite;
    }

    /**
     * Delete an MHP Site.
     *
     * @param int $id The ID of the MHP Site to delete.
     * @return bool True if the MHP Site was deleted, false otherwise.
     */
    public function delete(int $id): bool
    {
        $mhpSite = $this->findById($id);
        if ($mhpSite) {
            return $mhpSite->delete();
        }
        return false;
    }
}
