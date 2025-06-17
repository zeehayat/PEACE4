<?php

namespace App\Services;

use App\Models\IrrigationScheme;
use Illuminate\Database\Eloquent\Collection;

/**
 * Service class for Irrigation Scheme related operations.
 */
class IrrigationSchemeService
{
    protected IrrigationScheme $irrigationScheme;

    /**
     * IrrigationSchemeService constructor.
     *
     * @param IrrigationScheme $irrigationScheme The IrrigationScheme model instance.
     */
    public function __construct(IrrigationScheme $irrigationScheme)
    {
        $this->irrigationScheme = $irrigationScheme;
    }

    /**
     * Get all Irrigation Schemes.
     *
     * @return Collection A collection of IrrigationScheme models.
     */
    public function getAll(): Collection
    {
        return $this->irrigationScheme->all();
    }

    /**
     * Find an Irrigation Scheme by its ID.
     *
     * @param int $id The ID of the Irrigation Scheme.
     * @return IrrigationScheme|null The IrrigationScheme model instance, or null if not found.
     */
    public function findById(int $id): ?IrrigationScheme
    {
        return $this->irrigationScheme->find($id);
    }

    /**
     * Create a new Irrigation Scheme.
     *
     * @param array $data The data for creating the Irrigation Scheme.
     * @return IrrigationScheme The newly created IrrigationScheme model instance.
     */
    public function create(array $data): IrrigationScheme
    {
        return $this->irrigationScheme->create($data);
    }

    /**
     * Update an existing Irrigation Scheme.
     *
     * @param int $id The ID of the Irrigation Scheme to update.
     * @param array $data The data to update the Irrigation Scheme with.
     * @return IrrigationScheme|null The updated IrrigationScheme model instance, or null if not found.
     */
    public function update(int $id, array $data): ?IrrigationScheme
    {
        $scheme = $this->findById($id);
        if ($scheme) {
            $scheme->update($data);
        }
        return $scheme;
    }

    /**
     * Delete an Irrigation Scheme.
     *
     * @param int $id The ID of the Irrigation Scheme to delete.
     * @return bool True if the Irrigation Scheme was deleted, false otherwise.
     */
    public function delete(int $id): bool
    {
        $scheme = $this->findById($id);
        if ($scheme) {
            return $scheme->delete();
        }
        return false;
    }
}
